const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    console.log('📷 QR CODE READY:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => { console.log('✅ BOT IS ACTIVE'); });

client.initialize();
