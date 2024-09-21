module.exports = (bot) => {
    // Comando para reenviar mensajes desde el canal y agregar botones
    bot.command('error', async (ctx) => {
        try {
            const canalOrigen = '-1002232914965'; // Reemplaza con el ID del canal
            const idMensaje = 17; // Reemplaza con el ID del mensaje

            const chatDestino = ctx.chat.id; // ID del chat donde se reenviará el mensaje

            // Reenviar el mensaje
            await ctx.telegram.forwardMessage(chatDestino, canalOrigen, idMensaje);

            // Enviar botones después de reenviar el mensaje
            const botones = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Botón 1', url: 'https://example.com' }],
                        [{ text: 'Botón 2', callback_data: 'accion_2' }]
                    ]
                }
            };

            await ctx.reply('¡Mensaje reenviado! Aquí tienes algunas opciones:', botones);
        } catch (error) {
            console.error('Error al reenviar el mensaje:', error);
            ctx.reply('Hubo un error al intentar reenviar el mensaje.');
        }
    });

    // Acción para los botones
    bot.action('accion_2', (ctx) => {
        ctx.reply('¡Acción 2 ejecutada!');
    });
};