const { getResponseFromIA } = require('../../API/ia');

module.exports = (bot) => {
    bot.command('MetaAI', async (ctx) => {
        const query = ctx.message.text.split('/MetaAI ')[1];
        if (!query) {
            return ctx.reply('Por favor, proporciona una pregunta para la IA.');
        }

        const response = await getResponseFromIA(query);
        ctx.reply(response);
    });
};