const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    bot.command('start', (ctx) => {
        // Ruta a la carpeta de soporte dentro de file
        const mediaDir = path.join(__dirname, '../../file/bot/start');

        // Obtener todos los archivos de la carpeta
        const files = fs.readdirSync(mediaDir);

        // Seleccionar un archivo al azar
        const randomFile = files[Math.floor(Math.random() * files.length)];

        // Ruta completa al archivo seleccionado
        const filePath = path.join(mediaDir, randomFile);

        // Determinar si es una imagen, video o GIF por la extensión
        const isVideo = filePath.endsWith('.mp4') || filePath.endsWith('.mkv') || filePath.endsWith('.avi');
        const isGif = filePath.endsWith('.gif');

        // Crear botones
        const buttons = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔙 Menú Principal', callback_data: 'menus' }],
                    [{ text: 'Telegram', url: 'https://t.me/+BYzFrbW7mAQ2ZGVh' }],
                    [{ text: 'Whatsapp', url: 'https://whatsapp.com/channel/0029VaaSXpRAInPhXdkMoq0O' }]
                ]
            }
        };

        // Enviar el archivo con botones y leyenda
        if (isVideo) {
            ctx.replyWithVideo({ source: filePath }, { caption: "Bienenido / Welcome", ...buttons });
        } else if (isGif) {
            ctx.replyWithAnimation({ source: filePath }, { caption: "Bienenido / Welcome", ...buttons });
        } else {
            ctx.replyWithPhoto({ source: filePath }, { caption: "Bienenido / Welcome", ...buttons });
        }
    });
};