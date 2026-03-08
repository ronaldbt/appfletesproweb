// backend/index.js
require('dotenv').config();
// 📦 Dependencias principales
const express = require('express');
const cors = require('cors');

const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const authRoutes = require('./routes/authRoutes');
const path = require('path');



// 📄 Cargar variables de entorno
if (!process.env.FORCE_CLIENT_BOT) {
  process.env.FORCE_CLIENT_BOT = 'true'; // default temporal para pruebas
}

// 🚀 Inicializar servidor Express
const app = express();
app.use(cors({
  origin: ['https://fletespro.cl', 'https://www.fletespro.cl', 'https://app.fletespro.cl'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors()); // 🟢 responde a preflight OPTIONS
app.use(express.json());
// Aceptar también application/x-www-form-urlencoded por si el cliente envía formularios
app.use(express.urlencoded({ extended: true }));

// 🧠 Importaciones internas
const reservasRoutes = require('./routes/reservasRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
// manejarMensajeCliente y manejarRespuestaConductor desactivados (solo recordatorios por ahora)

// 📦 Referencia al cliente WhatsApp (permite reemplazar tras reconexión sin reiniciar backend)
const whatsappRef = { client: null };

const AUTH_PATH = path.join(__dirname, '.wwebjs_auth');
const RECONNECT_DELAY_MS = 10000; // 10 s antes de reintentar tras desconexión

function createWhatsAppClient() {
  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: AUTH_PATH }),
    takeoverOnConflict: true,
    takeoverTimeoutMs: 15000,
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-extensions',
        '--disable-background-networking',
        '--disable-sync',
        '--disable-translate',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--disable-hang-monitor',
        '--disable-prompt-on-repost',
        '--disable-domain-reliability'
      ]
    }
  });

  // Envolver sendMessage para no propagar errores markedUnread/getChat (evita que la sesión se caiga)
  const originalSendMessage = client.sendMessage.bind(client);
  client.sendMessage = async function (chatId, content, options = {}) {
    const opts = { ...options, sendSeen: false };
    try {
      return await originalSendMessage(chatId, content, opts);
    } catch (err) {
      const msg = String(err && err.message || err);
      if (/markedUnread|getChat/.test(msg)) {
        console.warn('[WA] Error de librería (markedUnread/getChat) capturado. El mensaje pudo haberse enviado. No se relanza para evitar desconexión.');
        return null;
      }
      throw err;
    }
  };

  return client;
}

function setupWhatsAppEvents(client) {
  const logTs = () => new Date().toISOString();

  client.on('qr', (qr) => {
    console.log(`[${logTs()}] 📲 [WA] QR recibido - Escanea con WhatsApp para vincular:`);
    qrcode.generate(qr, { small: true });
  });

  client.on('code', (code) => {
    console.log(`[${logTs()}] 🔢 [WA] Pairing code:`, code);
  });

  client.on('loading_screen', (percent, message) => {
    console.log(`[${logTs()}] 📱 [WA] Cargando: ${percent}% - ${message}`);
  });

  client.on('change_state', (state) => {
    console.log(`[${logTs()}] 🔄 [WA] change_state:`, state);
  });

  client.on('authenticated', async () => {
    console.log(`[${logTs()}] 🔐 [WA] Autenticado correctamente`);
    try {
      const ver = await client.getWWebVersion();
      console.log(`[${logTs()}] 🧩 [WA] WWebVersion:`, ver);
    } catch (_) {}
  });

  client.on('auth_failure', (msg) => {
    console.error(`[${logTs()}] ❌ [WA] Falla de autenticación:`, msg);
  });

  client.on('disconnected', (reason) => {
    console.warn(`[${logTs()}] ⚠️ [WA] DESCONECTADO. Razón:`, reason);
    console.log(`[${logTs()}] [WA] Posibles causas: sesión cerrada en otro dispositivo, enviar al mismo número vinculado (markedUnread/getChat), timeout, actualización de WhatsApp Web.`);
    stopRecordatorioJob();
    console.log(`[${logTs()}] 🔄 [WA] Reintento en ${RECONNECT_DELAY_MS / 1000}s...`);
    whatsappRef.client = null;
    setTimeout(() => {
      if (whatsappRef.client) return;
      console.log(`[${logTs()}] 🔄 [WA] Creando nuevo cliente y reinicializando (LocalAuth).`);
      const newClient = createWhatsAppClient();
      whatsappRef.client = newClient;
      setupWhatsAppEvents(newClient);
      newClient.initialize();
    }, RECONNECT_DELAY_MS);
  });

  const { startRecordatorioJob, stopRecordatorioJob } = require('./services/recordatorioService');
  let pageErrorAttached = false;

  client.on('ready', async () => {
    console.log(`[${logTs()}] ✅ [WA] Conectado y listo`);
    try {
      const state = await client.getState().catch(() => null);
      console.log(`[${logTs()}] 📟 [WA] Estado:`, state);
      const info = client.info;
      if (info) {
        const numLinked = info.wid && info.wid.user ? info.wid.user : '(desconocido)';
        console.log(`[${logTs()}] 👤 [WA] Usuario:`, info.pushname || '(sin nombre)', '| Número vinculado:', numLinked);
        console.log(`[${logTs()}] ⚠️ [WA] Si envías notificaciones al mismo número (ej. 56979796841), WhatsApp Web puede fallar (markedUnread/getChat). Usa otro número para recibir avisos.`);
      }
      startRecordatorioJob(client);
      if (!pageErrorAttached && client.pupPage) {
        pageErrorAttached = true;
        client.pupPage.on('pageerror', (err) => {
          const msg = String(err && err.message || err);
          if (msg.length > 3) console.error('🪲 pageerror:', msg);
        });
        client.pupPage.on('error', (err) => console.error('🪲 pupPage error:', String(err)));
      }
    } catch (_) {}
  });

  client.on('message', async (message) => {
    if (message.fromMe) return;
  });

  client.on('message_ciphertext', (msg) => {
    console.log('🔐 message_ciphertext recibido (aún cifrado):', {
      from: msg.from,
      type: msg.type,
      ts: msg.timestamp
    });
  });
}

const fletesRoutes = require('./routes/fletesRoutes') // ⬅️ importar
app.use('/api/fletes', fletesRoutes) // ⬅️ usar la ruta
app.use('/api/payments', paymentsRoutes)

// 🛡 Middleware para inyectar el cliente WhatsApp en cada request (siempre el actual tras reconexión)
app.use((req, res, next) => {
  req.whatsapp = whatsappRef.client;
  next();
});

// Log de requests POST a admin/fletes para debug
app.use((req, res, next) => {
  if (req.method === 'POST' && req.originalUrl.includes('/admin/fletes') && !req.originalUrl.includes('/send')) {
    console.log('📥 [API] POST /admin/fletes recibido', req.originalUrl, 'body keys:', req.body ? Object.keys(req.body) : 'sin body');
  }
  next();
});

// 🌐 Ruta base de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend FletesPro funcionando en Express');
});

// 📦 Rutas de la API
app.use('/api', reservasRoutes);
app.use('/api', authRoutes);

const adminFletesRoutes = require('./routes/adminFletesRoutes');
app.use('/api', adminFletesRoutes);

const adminConductoresRoutes = require('./routes/adminConductoresRoutes');
app.use('/api', adminConductoresRoutes);

const adminStatsRoutes = require('./routes/adminStatsRoutes');
app.use('/api', adminStatsRoutes);

const adminUsuariosRoutes = require('./routes/adminUsuariosRoutes');
app.use('/api', adminUsuariosRoutes);

const adminReservasRoutes = require('./routes/adminReservasRoutes');
app.use('/api', adminReservasRoutes);

const adminGastosRoutes = require('./routes/adminGastosRoutes');
app.use('/api', adminGastosRoutes);

const vehiculosRoutes = require('./routes/vehiculosRoutes');
app.use('/api', vehiculosRoutes);

// Rutas específicas para conductores
const conductorRoutes = require('./routes/conductorRoutes');
app.use('/api', conductorRoutes);

// ▶️ Iniciar cliente WhatsApp (y reconectar automáticamente si se desconecta)
whatsappRef.client = createWhatsAppClient();
setupWhatsAppEvents(whatsappRef.client);
whatsappRef.client.initialize();

// 🚀 Iniciar servidor Express
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌐 Servidor Express activo en http://localhost:${PORT}`);
});