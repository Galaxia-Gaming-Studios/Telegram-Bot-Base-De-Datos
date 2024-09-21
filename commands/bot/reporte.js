const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    const adminChatIds = [
        '7315104237', //Jimmy MA
        '6746456322', //Ariel PM
        // ID obligatorio
        // Puedes agregar hasta 9 IDs más si es necesario
        // 'ID2',
        // 'ID3',
        // ...
    ];

    bot.command('reporte', async (ctx) => {
        const args = ctx.message.text.split(' ').slice(1).join(' ');

        if (!args) {
            const instructions = 
`Para hacer un reporte, utiliza el comando de la siguiente manera:

- /reporte [descripción del problema]

Por ejemplo:
- /reporte el comando /menús no sirve

Tu reporte será enviado al administrador.`;

            // Envía el mensaje de instrucciones con el botón y multimedia
            const files = fs.readdirSync(path.join(__dirname, '../../file/bot/reporte'));
            const randomFile = files[Math.floor(Math.random() * files.length)];
            const filePath = path.join(__dirname, '../../file/bot/reporte', randomFile);

            const extraOptions = {
                caption: instructions,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '🔙 Menú Principal', callback_data: 'menu0' }]
                    ]
                }
            };

            if (randomFile.endsWith('.jpg') || randomFile.endsWith('.png')) {
                await ctx.replyWithPhoto({ source: filePath }, extraOptions);
            } else if (randomFile.endsWith('.mp4')) {
                await ctx.replyWithVideo({ source: filePath }, extraOptions);
            } else if (randomFile.endsWith('.gif')) {
                await ctx.replyWithAnimation({ source: filePath }, extraOptions);
            }

        } else {
            // Mensaje de reporte que se enviará a los administradores
            const reportMessage = 
`📣 Nuevo reporte 📣
👤 Usuario: @${ctx.from.username || ctx.from.first_name}
📩 Descripción: ${args}`;

            // Enviar el reporte a cada ID de administrador
            for (const adminChatId of adminChatIds) {
                await bot.telegram.sendMessage(adminChatId, reportMessage, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🔙 Menú Principal', callback_data: 'menu0' }]
                        ]
                    }
                });
            }

            // Responder al usuario
            ctx.reply('✅ Tu reporte ha sido enviado al administrador.');
        }
    });
};