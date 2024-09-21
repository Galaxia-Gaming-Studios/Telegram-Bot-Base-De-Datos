const fs = require('fs');
const path = require('path');

// Directorios para stickers y audios
const stickersDir = path.join(__dirname, '../../file/menu0/random/stikers');
const audiosDir = path.join(__dirname, '../../file/menu0/random/audios');

// Lista de emojis
const emojis = ['😀', '😂', '😍', '😎', '🥳', '🤖', '🎉', '🔥', '💯', '👌'];

// Cargar los stickers y audios disponibles en memoria
let stickers = [];
let audios = [];

// Cargar los stickers (normal y animados) y audios al iniciar
function loadFiles() {
    try {
        stickers = fs.readdirSync(stickersDir).filter(file => file.endsWith('.webp') || file.endsWith('.tgs'));
        audios = fs.readdirSync(audiosDir).filter(file => file.endsWith('.mp3'));
    } catch (error) {
        console.error('Error al cargar los archivos:', error);
    }
}

// Llamar a la función al iniciar para cargar los archivos
loadFiles();

module.exports = (bot) => {
    // Comando /Random para enviar sticker, audio o emoji aleatorio
    bot.command('Random', (ctx) => {
        sendRandomStickerOrAudioOrEmoji(ctx);
    });

    // Función para enviar sticker, audio o emoji aleatorio
    function sendRandomStickerOrAudioOrEmoji(ctx) {
        const randomType = Math.random(); // Valor entre 0 y 1

        if (randomType < 0.4 && stickers.length > 0) {
            // Enviar sticker
            const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
            const stickerPath = path.join(stickersDir, randomSticker);
            
            if (randomSticker.endsWith('.tgs')) {
                // Enviar sticker animado
                ctx.replyWithAnimation({ source: stickerPath });
            } else {
                // Enviar sticker normal
                ctx.replyWithSticker({ source: stickerPath });
            }
        } else if (randomType >= 0.4 && randomType < 0.7 && audios.length > 0) {
            // Enviar audio
            const randomAudio = audios[Math.floor(Math.random() * audios.length)];
            const audioPath = path.join(audiosDir, randomAudio);
            ctx.replyWithAudio({ source: audioPath });
        } else {
            // Enviar emoji aleatorio
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            ctx.reply(randomEmoji);
        }
    }
};