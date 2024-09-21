const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    bot.command('soporte', (ctx) => {
        // Ruta a la carpeta de soporte dentro de file
        const mediaDir = path.join(__dirname, '../../../file/menu0/gemini');

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
            // Primera fila de botones
            [
                { text: 'Botón 1', callback_data: 'accion1' },
                { text: 'Botón 2', callback_data: 'accion2' }
            ], // Termina la primera fila
            // Segunda fila de botones
            [
                { text: 'Botón 3', callback_data: 'accion3' }
            ] // Termina la segunda fila
        ]
    }
};

        // Enviar el archivo con botones y leyenda
        if (isVideo) {
            ctx.replyWithVideo({ source: filePath }, { caption: "Soporte Técnico", ...buttons });
        } else if (isGif) {
            ctx.replyWithAnimation({ source: filePath }, { caption: "Soporte Técnico", ...buttons });
        } else {
            ctx.replyWithPhoto({ source: filePath }, { caption: "Soporte Técnico", ...buttons });
        }
    });
};