const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', qr => {
    console.log('📷 امسح الكود من واتساب:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ البوت شغال 24/7');
});

// حفظ الطلبات
function saveOrder(data) {
    fs.appendFileSync('orders.txt', data + '\n----------------\n');
}

client.on('message', async msg => {

    // تجاهل المجموعات
    if (msg.from.includes('@g.us')) return;

    const text = msg.body.toLowerCase();

    // القائمة
    if (text.includes('مرحبا') || text.includes('السلام')) {
        msg.reply(`أهلاً وسهلاً 👋

📋 القائمة:

1️⃣ برمجة جوالات 📱  
2️⃣ حوالات 💸  
3️⃣ شحن رصيد ⚡  
4️⃣ الأسعار 💰  
5️⃣ دعم 👨‍💻

اكتب الرقم أو اسم الخدمة 👇`);
    }

    // برمجة
    else if (text.includes('1') || text.includes('برمجة') || text.includes('تفليش')) {
        msg.reply(`📱 خدمات البرمجة:

✔️ تفليش  
✔️ إزالة FRP  
✔️ إصلاح النظام  

✍️ اكتب:
نوع الجهاز + المشكلة`);

        saveOrder(`📱 برمجة\nالعميل: ${msg.from}\nالنص: ${msg.body}`);
    }

    // حوالات
    else if (text.includes('2') || text.includes('حوالة') || text.includes('تحويل')) {
        msg.reply(`💸 استلام حوالات:

أرسل:
- الاسم  
- المبلغ  
- صورة الحوالة`);

        saveOrder(`💸 حوالة\nالعميل: ${msg.from}\nالنص: ${msg.body}`);
    }

    // شحن
    else if (text.includes('3') || text.includes('شحن') || text.includes('رصيد')) {
        msg.reply(`⚡ شحن رصيد:

📶 جميع الشبكات

أرسل:
- الرقم  
- المبلغ  
- الشبكة`);

        saveOrder(`⚡ شحن\nالعميل: ${msg.from}\nالنص: ${msg.body}`);
    }

    // أسعار
    else if (text.includes('4') || text.includes('سعر')) {
        msg.reply(`💰 الأسعار:

📱 برمجة: حسب الجهاز  
⚡ شحن: عمولة بسيطة  
💸 حوالات: حسب المبلغ  

اكتب التفاصيل 👇`);
    }

    // دعم
    else if (text.includes('5') || text.includes('دعم') || text.includes('موظف')) {
        msg
