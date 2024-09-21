const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = (bot) => {
    bot.command('copilot', async (ctx) => {
        try {
            const args = ctx.message.text.split(' ').slice(1);
            
            if (args.length === 0) {
                ctx.reply('🏮 Tienes que hacer una pregunta después del comando. Ejemplo: /copilot ¿Eres mujer?');
                return;
            }

            let userPregunta = args.join(' '); // Recoge la pregunta del usuario
            const url = `https://deliriusapi-official.vercel.app/ia/bingia?query=${encodeURIComponent(userPregunta)}`;
            const response = await axios.get(url);

            if (response.data.status) {
                // Ruta a la carpeta de fotos, videos y GIFs
                const mediaDir = path.join(__dirname, '../../file/menu0/copilot');

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
                            [{ text: 'Regresar al menú', callback_data: 'menu2' }]
                        ]
                    }
                };

                // Crear leyenda (caption) para la multimedia
                const caption = `*Copilot*
*⚠️Límite 100 Palabras*
🎱Pregunta🤔: 
*${userPregunta}* 
💬Respuesta🤖: 
*${response.data.message || 'Sin respuesta'}*

*Colaborador*
[❦┕ᴡᴀɪғᴜ ⭐ʙᴏᴛ⊡❥](https://chat.whatsapp.com/BcTvQlXoNBLJPMJjbtdElS)`;

                // Enviar el archivo multimedia según el tipo
                if (isVideo) {
                    await ctx.replyWithVideo({ source: filePath }, { caption, parse_mode: 'Markdown', ...buttons });
                } else if (isGif) {
                    await ctx.replyWithAnimation({ source: filePath }, { caption, parse_mode: 'Markdown', ...buttons });
                } else {
                    await ctx.replyWithPhoto({ source: filePath }, { caption, parse_mode: 'Markdown', ...buttons });
                }

            } else {
                ctx.reply('🍫 Copilot no pudo procesar su mensaje.');
            }

        } catch (error) {
            console.error('Hubo un error:', error);
            ctx.reply('☔ Ocurrió un error al procesar su solicitud.');
        }
    });

    // Acción del botón "menu2" - Redirigir al menú principal
    bot.action('menu2', (ctx) => {
        ctx.reply('Has regresado al menú principal.');
        ctx.answerCbQuery(); // Responder a la acción del botón
    });
};