const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    // Comando principal /redessociales
    bot.command('redessociales', (ctx) => {
        const chatId = ctx.chat.id;
        const photoPath = path.join(__dirname, '../file/Creadores.jpg'); // Ajusta el nombre del archivo de imagen

        // Verifica si el archivo de imagen existe antes de enviarlo
        if (fs.existsSync(photoPath)) {
            bot.telegram.sendPhoto(chatId, { source: photoPath }, {
                caption: `               **Redes Sociales**
┏┅┅┅┅Redes Sociales┅≫
┇ ➪ [Telegram](https://t.me/Galaxia_Gaming_Studios)
┇ ➪ [WhatsApp]()
┇ ➪ [GitHub](https://github.com/Galaxia-Gaming-Studios)
┇ ➪ [Instagram]()
┇ ➪ [YouTube]()
┇ ➪ [Base De Datos](https://github.com/Galaxia-Gaming-Studios/Telegram-Bot-Base-De-Datos)
┗┅┅┅┅┅┅┅┅┅┅┅┅≫`,
                parse_mode: 'Markdown'
            });
        } else {
            ctx.reply('Lo siento, no se encontró la imagen de los creadores.');
        }
    });
};