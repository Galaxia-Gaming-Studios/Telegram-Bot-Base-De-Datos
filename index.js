const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cfonts = require('cfonts');
const gradient = require('gradient-string');
const readline = require('readline');

// Mostrar el banner
const banner = cfonts.render(('Teleg\nr\na\nm\n-Bot | 2.2.0'), {
    font: 'block',
    align: 'center',
    colors: ['cyan', 'magenta'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
});

console.log(banner.string);

// Mensaje de bienvenida
const welcomeMessage = `
✧─── ･ ｡ﾟ★: *.✦ .* :★. ───✧Telegram✧─── ･ ｡ﾟ★: *.✦ .* :★. ───✧

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⢔⣒⠂⣀⣀⣤⣄⣀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣴⣿⠋⢠⣟⡼⣷⠼⣆⣼⢇⣿⣄⠱⣄
⠀⠀⠀⠀⠀⠀⠀⠹⣿⡀⣆⠙⠢⠐⠉⠉⣴⣾⣽⢟⡰⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣦⠀⠤⢴⣿⠿⢋⣴⡏⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡙⠻⣿⣶⣦⣭⣉⠁⣿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⠀⠈⠉⠉⠉⠉⠇⡟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⣘⣦⣀⠀⠀⣀⡴⠊⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⢻⣿⣿⣿⣿⠻⣧⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠫⣿⠉⠻⣇⠘⠓⠂⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢶⣾⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣧⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠙⠻⢿⣿⣿⠿⠛⣄⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣷⠂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀
🟩🟩🟩🟩🟩🟩🟩🟩
🏿🟩🟩🏿🟩🟩🟩🟩
🏾🏿🟩🏾🏿🟩🟩🏿
🏽🏽🏾🏼🏽🏾🏿🟩
🏾🏿🏾🏽🏾🏼🏽🏾
🏽🏽🏾🏾🏾🏾🏼🏽
🏼🏽🏾🏽🏾🏿🏾🏾
🏾🏿🏽🏾🏾🏽🏾🏿  

Global GGS🌎🌍🌏🌐
✧─── ･ ｡ﾟ★: *.✦ .* :★. ───✧Telegram✧─── ･ ｡ﾟ★: *.✦ .* :★. ───✧


`;

console.log(gradient.rainbow(welcomeMessage));

// Token del bot de Telegram
const bot = new Telegraf('7540879008:AAEQzrFhy3Kdw1OKWWR9bUZ3mpOEIcic4Rg');

// Función para formatear la hora
function formatTime() {
    return new Date().toLocaleTimeString();
}

// Manejar y mostrar los logs en la consola
function logMessage(ctx, command = null) {
    const user = ctx.from.username || `${ctx.from.first_name} ${ctx.from.last_name || ''}`;
    const isPrivate = ctx.chat.type === 'private' ? 'Sí' : 'No';
    const chatTitle = ctx.chat.title || 'N/A';
    const topic = ctx.message.is_topic_message ? `Tema: ${ctx.message.topic_name}` : 'N/A';
    const mediaInfo = ctx.message.audio
        ? `Audio - Duración: ${ctx.message.audio.duration} segundos`
        : ctx.message.video
        ? `Video - Duración: ${ctx.message.video.duration} segundos`
        : ctx.message.sticker
        ? `Sticker - Emoji: ${ctx.message.sticker.emoji}`
        : '';

    console.log(`
⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰
IDs: ${ctx.from.id}
🕕Hora: ${formatTime()}
Grupo: ${chatTitle}
Tema: ${topic}
Privado: ${isPrivate}
👤Usuario: @${user}
📩Mensaje: ${ctx.message.text || mediaInfo || 'Archivo multimedia recibido'}
Comando: ${command || 'No es un comando'}
ID del mensaje: ${ctx.message.message_id}
⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰
    `);
}

// Función para cargar comandos dinámicamente
function loadCommands(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(item => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            loadCommands(fullPath);
        } else if (item.isFile() && item.name.endsWith('.js')) {
            try {
                const command = require(fullPath);
                if (typeof command === 'function') {
                    command(bot);
                    console.log(`Comando cargado: ${fullPath}`);
                } else {
                    console.error(`Error al cargar el comando en ${fullPath}. Asegúrate de que exporta una función.`);
                }
            } catch (err) {
                console.error(`Error al cargar el comando ${fullPath}:`, err.message);
            }
        }
    });
}

// Cargar todos los comandos desde la carpeta 'commands'
loadCommands(path.join(__dirname, 'commands'));

// Manejo de mensajes
bot.on('message', (ctx) => {
    logMessage(ctx);
});

// Manejar comandos desde la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'stop') {
        bot.stop();
    } else {
        console.log('Comando no reconocido.');
    }
});

// Iniciar el bot
bot.launch().then(() => {
    console.log('Bot iniciado correctamente');
}).catch(error => {
    console.error('Error al iniciar el bot:', error);
});