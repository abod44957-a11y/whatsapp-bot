const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // هذا السطر هو الحل لمشكلة Code 127
        executablePath: '/usr/bin/google-chrome', 
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

client.on('qr', qr => {
    console.log('📷 امسح الكود التالي الآن:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ البوت شغال بنجاح 24/7!');
});

// قائمة الردود التلقائية
client.on('message', async msg => {
    const text = msg.body.toLowerCase();
    if (text.includes('مرحبا')) {
        msg.reply('أهلاً بك! كيف يمكنني مساعدتك اليوم؟');
    }
});

client.initialize();
