const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    bot.command('soporte', (ctx) => {
        // Ruta a la carpeta de soporte dentro de file
        const mediaDir = path.join(__dirname, '../../file/soporte');

        // Obtener todos los archivos de la carpeta
        const files = fs.readdirSync(mediaDir);

        // Seleccionar un archivo al azar
        const randomFile = files[Math.floor(Math.random() * files.length)];

        // Ruta completa al archivo seleccionado
        const filePath = path.join(mediaDir, randomFile);

        // Determinar si es una imagen, video o GIF por la extensión
        const isVideo = filePath.endsWith('.mp4') || filePath.endsWith('.mkv') || filePath.endsWith('.avi');
        const isGif = filePath.endsWith('.gif');

        if (isVideo) {
            ctx.replyWithVideo({ source: filePath }, { caption: "Soporte Técnico" });
        } else if (isGif) {
            ctx.replyWithAnimation({ source: filePath }, { caption: "Soporte Técnico" });
        } else {
            ctx.replyWithPhoto({ source: filePath }, { caption: "Soporte Técnico" });
        }
    });
};