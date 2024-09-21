const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    // Comando / - Enviar archivos multimedia con botones
    bot.command('fnaf1', (ctx) => {
        // Ruta a la carpeta de fotos, videos y GIFs
        const mediaDir = path.join(__dirname, '../../../file/menu2/fnaf/fnaf1');

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
                        { text: '🎟️Menú FNAF🎟️', callback_data: 'menu2' },
                        { text: 'Creador 1', callback_data: 'creador1' } // Nuevo botón para "Creador 1"
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
    bot.action('menu2', (ctx) => {
        const menuFile = path.join(__dirname, '../../../commands/menu2/menu2.js');
        delete require.cache[require.resolve(menuFile)];
        const menu = require(menuFile);
        menu(bot); // Ejecutar el código de menu2.js
        ctx.answerCbQuery(); // Responder a la acción del botón
    });

    // Acción "creador1" - Redirigir al comando creadores.js
    bot.action('creador1', (ctx) => {
        const creadoresFile = path.join(__dirname, '../../../commands/menu2/menu/creadores.js');
        delete require.cache[require.resolve(creadoresFile)];
        const creadores = require(creadoresFile);
        creadores(bot); // Ejecutar el código de creadores.js
        ctx.answerCbQuery(); // Responder a la acción del botón
    });
};