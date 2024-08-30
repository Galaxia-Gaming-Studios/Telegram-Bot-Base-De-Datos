module.exports = (bot) => {
    bot.on('message', (msg) => {
        const lowerText = msg.text.toLowerCase();

        if (lowerText === 'hola') {
            bot.sendMessage(msg.chat.id, '¡Hola! ¿En qué puedo ayudarte?');
        } else if (lowerText === 'adiós') {
            bot.sendMessage(msg.chat.id, '¡Hasta luego!');
        }
    });
};