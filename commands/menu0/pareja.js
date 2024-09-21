const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    bot.command('pareja', async (ctx) => {
        try {
            // Verificar si el comando se utiliza en un grupo
            if (!ctx.message.chat || ctx.message.chat.type === 'private') {
                return ctx.reply('Este comando solo funciona en grupos.');
            }

            const chatMembers = await ctx.telegram.getChatMembersCount(ctx.message.chat.id);
            if (chatMembers < 2) {
                return ctx.reply('Debe haber al menos dos personas en el grupo para usar este comando.');
            }

            // Obtener el usuario que usó el comando
            const user1 = ctx.from;

            // Seleccionar otro usuario al azar del grupo (excluyendo al que usó el comando)
            const members = await ctx.telegram.getChatAdministrators(ctx.message.chat.id);
            const filteredMembers = members.filter(member => member.user.id !== user1.id);
            const user2 = filteredMembers[Math.floor(Math.random() * filteredMembers.length)].user;

            // Generar porcentaje de amor al azar
            const lovePercentage = Math.floor(Math.random() * 101); // De 0 a 100%

            // Escapar caracteres especiales en los nombres de usuario para MarkdownV2
            const escapeMarkdown = (text) => {
                return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
            };

            const user1Name = escapeMarkdown(user1.username || user1.first_name);
            const user2Name = escapeMarkdown(user2.username || user2.first_name);

            // Obtener un archivo multimedia aleatorio (imagen, video o GIF)
            const mediaDir = path.join(__dirname, '../../file/menu0/pareja');
            const files = fs.readdirSync(mediaDir);
            const randomFile = files[Math.floor(Math.random() * files.length)];
            const filePath = path.join(mediaDir, randomFile);
            const isVideo = filePath.endsWith('.mp4') || filePath.endsWith('.mkv') || filePath.endsWith('.avi');
            const isGif = filePath.endsWith('.gif');

            // Mensaje de pareja con porcentaje de amor
            const message = `
❤️ *\\¡Pareja del Día\\!* ❤️
Hoy @${user1Name} 💞 @${user2Name}
*Compatibilidad*: ${lovePercentage}% 💘
`;

            // Botones interactivos
            const buttons = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '¡Felicidades! 🎉', callback_data: 'celebrar' }],
                        [{ text: 'Menú Principal', callback_data: 'menu_principal' }]
                    ]
                }
            };

            // Enviar el archivo multimedia según el tipo
            if (isVideo) {
                await ctx.replyWithVideo({ source: filePath }, { caption: message, parse_mode: 'MarkdownV2', ...buttons });
            } else if (isGif) {
                await ctx.replyWithAnimation({ source: filePath }, { caption: message, parse_mode: 'MarkdownV2', ...buttons });
            } else {
                await ctx.replyWithPhoto({ source: filePath }, { caption: message, parse_mode: 'MarkdownV2', ...buttons });
            }

        } catch (error) {
            console.error('Error al procesar el comando /pareja:', error);
            ctx.reply('⚠️ Ocurrió un error al procesar su solicitud.');
        }
    });

    // Acción del botón "celebrar"
    bot.action('celebrar', (ctx) => {
        ctx.reply('¡Que viva el amor! 💖');
        ctx.answerCbQuery(); // Responder a la acción del botón
    });

    // Acción del botón "menu_principal"
    bot.action('menu_principal', (ctx) => {
        ctx.reply('Regresando al menú principal.');
        ctx.answerCbQuery(); // Responder a la acción del botón
    });
};