const ytdl = require('ytdl-core');

module.exports = (bot) => {
    bot.command('play', async (ctx) => {
        const url = ctx.message.text.split(' ')[1];

        if (!ytdl.validateURL(url)) {
            ctx.reply('❌ URL no válida. Por favor, proporciona un enlace de YouTube válido.');
            return;
        }

        try {
            // Código para descargar el audio o video
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title;
            
            ctx.reply(`🎵 Descargando: ${title}`);

            // Aquí puedes añadir tu código de descarga

        } catch (error) {
            console.error('Error al descargar el audio:', error);
            ctx.reply('❌ Error al descargar el audio. Inténtalo de nuevo más tarde.');
        }
    });
};