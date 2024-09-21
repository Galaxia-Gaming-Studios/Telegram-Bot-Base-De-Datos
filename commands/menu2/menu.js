const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    // Comando / - Enviar archivos multimedia con botones
    bot.action('menu2', (ctx) => {
        // Ruta a la carpeta de fotos, videos y GIFs
        const mediaDir = path.join(__dirname, '../../../file/menu2/menu');

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
                    [
                        { text: 'Drive', url: 'https://drive.google.com/file/d/10AQdoDp0LgHxse3vKB1j0d0ngT0zNsIc/view?usp=drivesdk' },
                        { text: 'Mega', url: 'https://drive.google.com/file/d/10AQdoDp0LgHxse3vKB1j0d0ngT0zNsIc/view?usp=drivesdk' }
                    ],
                    [
                        { text: 'Mediafire', url: 'https://drive.google.com/file/d/10AQdoDp0LgHxse3vKB1j0d0ngT0zNsIc/view?usp=drivesdk' },
                        { text: 'TeraBox', url: 'https://drive.google.com/file/d/10AQdoDp0LgHxse3vKB1j0d0ngT0zNsIc/view?usp=drivesdk' }
                    ],
                    [
                        { text: '🎟️Menú FNAF🎟️', callback_data: 'menu3' }
                    ]
                ]
            }
        };

        // Crear leyenda (caption)
        const caption = `hola`;

        // Enviar el archivo multimedia con los botones según el tipo
        if (isVideo) {
            ctx.replyWithVideo({ source: filePath }, { caption, parse_mode: 'Markdown', ...buttons });
        } else if (isGif) {
            ctx.replyWithAnimation({ source: filePath }, { caption, parse_mode: 'Markdown', ...buttons });
        } else {
            ctx.replyWithPhoto({ source: filePath }, { caption, parse_mode: 'Markdown', ...buttons });
        }
    });

    // Acción "menu2" - Redirigir al menú principal FNAF
    bot.action('menu3', (ctx) => {
        const menuFile = path.join(__dirname, '../../../commands/menu1/menu3.js');
        delete require.cache[require.resolve(menuFile)];
        const menu = require(menuFile);
        menu(bot); // Ejecutar el código de menu2.js
        ctx.answerCbQuery(); // Responder a la acción del botón
    });


};