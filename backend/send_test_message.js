const { Client, LocalAuth } = require('whatsapp-web.js');

async function sendTestMessage() {
  const client = new Client({
    authStrategy: new LocalAuth({
      dataPath: './.wwebjs_auth'
    }),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      console.log('Timeout - cerrando cliente');
      client.destroy();
      reject(new Error('Timeout waiting for WhatsApp to be ready'));
    }, 30000);

    client.once('ready', async () => {
      console.log('WhatsApp listo!');
      
      try {
        const info = await client.info;
        console.log('Numero conectado:', info.wid.user);
        
        const number = '56979796841@s.whatsapp.net';
        const message = 'Mensaje de prueba desde el servidor - WhatsApp funcionando correctamente';
        
        console.log('Enviando mensaje...');
        await client.sendMessage(number, message);
        console.log('Mensaje enviado exitosamente!');
        
        clearTimeout(timeout);
        client.destroy();
        resolve('Mensaje enviado correctamente');
        
      } catch (error) {
        console.error('Error enviando mensaje:', error.message);
        clearTimeout(timeout);
        client.destroy();
        reject(error);
      }
    });

    client.on('auth_failure', (msg) => {
      console.error('Error de autenticacion:', msg);
      clearTimeout(timeout);
      client.destroy();
      reject(new Error('Authentication failed'));
    });

    client.on('disconnected', (reason) => {
      console.log('Cliente desconectado:', reason);
      clearTimeout(timeout);
      reject(new Error('Client disconnected'));
    });

    console.log('Iniciando cliente WhatsApp...');
    client.initialize();
  });
}

sendTestMessage()
  .then(result => {
    console.log('Resultado:', result);
    process.exit(0);
  })
  .catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });