module.exports = (bot) => {
    bot.command('IDs', async (ctx) => {
        const chatId = ctx.chat.id;
        const userId = ctx.from.id;

        let response = `Tu ID es: ${userId}`;

        if (ctx.chat.type !== 'private') {
            response += `\nEl ID del grupo es: ${chatId}`;
        }

        if (ctx.message.entities && ctx.message.entities.some(entity => entity.type === 'mention')) {
            const mention = ctx.message.entities.find(entity => entity.type === 'mention');
            const mentionedUsername = ctx.message.text.slice(mention.offset + 1, mention.offset + mention.length); // Remover el carácter "@"

            try {
                const user = await bot.telegram.getChatMember(chatId, mentionedUsername);
                response += `\nEl ID de @${mentionedUsername} es: ${user.user.id}`;
            } catch (error) {
                response += `\nNo se pudo obtener el ID de @${mentionedUsername}. Verifica que el usuario esté en el grupo o que el nombre de usuario sea correcto.`;
            }
        }

        ctx.reply(response);
    });
};