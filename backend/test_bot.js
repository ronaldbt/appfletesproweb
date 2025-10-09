const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

// Create a new client instance
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: path.join(__dirname, '.wwebjs_auth')
  }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  }
});

client.on('loading_screen', (percent, message) => {
  console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
  console.log('QR RECEIVED');
  qrcode.generate(qr, {small: true});
});

client.on('code', (code) => {
  console.log('Pairing code:', code);
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('auth_failure', (message) => {
  console.log('AUTH FAILURE:', message);
});

client.on('ready', async () => {
  console.log('READY');
  try {
    const ver = await client.getWWebVersion();
    console.log('WWebVersion =', ver);
  } catch (_) {}

  if (client.pupPage) {
    client.pupPage.on('pageerror', (err) => console.log('Page error:', String(err)));
    client.pupPage.on('error', (err) => console.log('Page error:', String(err)));
  }
});

client.on('message', async (message) => {
  console.log('MESSAGE RECEIVED (message):', message.body, 'FROM:', message.from);
  if (message.body === '!ping') {
    await client.sendMessage(message.from, 'pong');
  } else {
    await message.reply('Hola! Bot funcionando correctamente');
  }
});

client.on('message_create', async (message) => {
  if (message.fromMe) return;
  console.log('MESSAGE RECEIVED (message_create):', message.body, 'FROM:', message.from);
});

// Start your client
client.initialize();
