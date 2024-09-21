module.exports = (bot) => {
    // Comando /invocar para mencionar a todos los usuarios del grupo
    bot.command('invocar', async (ctx) => {
        try {
            // Verificar si el comando fue utilizado en un grupo
            if (!ctx.chat || ctx.chat.type !== 'supergroup') {
                return ctx.reply('Este comando solo se puede usar en grupos.');
            }

            // Obtener los miembros del grupo
            const members = await ctx.getChatAdministrators(); // Obtener administradores
            const allMembers = await bot.telegram.getChatMembersCount(ctx.chat.id); // Contar los miembros

            let admins = [];
            let users = [];
            let bots = [];

            // Recorrer los miembros para separarlos por rol
            for (const member of members) {
                if (member.user.is_bot) {
                    bots.push(`@${member.user.username}`);
                } else if (member.status === 'administrator' || member.status === 'creator') {
                    admins.push(`@${member.user.username}`);
                } else {
                    users.push(`@${member.user.username}`);
                }
            }

            // Texto final con todos los mencionados
            let message = '------\n<b>Admin</b>\n';
            message += admins.length ? admins.join('\n') : 'No hay administradores.\n';
            message += '\n------\n<b>Usuarios</b>\n';
            message += users.length ? users.join('\n') : 'No hay usuarios.\n';
            message += '\n------\n<b>Bots</b>\n';
            message += bots.length ? bots.join('\n') : 'No hay bots.\n';

            // Enviar el mensaje
            ctx.replyWithHTML(message);
        } catch (error) {
            console.error('Error al invocar usuarios:', error);
            ctx.reply('Hubo un error al obtener la lista de usuarios.');
        }
    });
};