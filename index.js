const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cfonts = require('cfonts');
const gradient = require('gradient-string');
const readline = require('readline');

// Mostrar el banner
const banner = cfonts.render(('Teleg\nr\na\nm\n-Bot | 2.0.0'), {
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

// Mensaje de bienvenida con colores RGB
const welcomeMessage = `
====================
Creador:
Jimmy Martínez 
Colaboradores:
Joxua Castro 
Ariel Antonio Padilla Martínez 

Global GGS

Comandos disponibles:
- stop: Detener el bot
- Actualizar: Actualizar y reiniciar el bot para aplicar cambios
- Resetiar: Reiniciar el bot sin actualizar
====================
`;

console.log(gradient.rainbow(welcomeMessage));

// Token del bot de Telegram
const bot = new Telegraf('7546453870:AAHY3Ax9BPI4IJprPxZ-s3VJGLZ4J0p-8r8');

// Función para formatear la hora
function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

// Manejar y mostrar los logs en la consola
function logMessage(ctx, command = null) {
    const user = ctx.from.username || `${ctx.from.first_name} ${ctx.from.last_name || ''}`;
    const chatType = ctx.chat.type;
    const isPrivate = chatType === 'private' ? 'Sí' : 'No';
    const chatTitle = ctx.chat.title || 'N/A';
    const topic = ctx.message.is_topic_message ? `Tema: ${ctx.message.topic_name}` : 'N/A';
    let mediaInfo = '';

    if (ctx.message.audio) {
        mediaInfo = `Audio - Duración: ${ctx.message.audio.duration} segundos`;
    } else if (ctx.message.video) {
        mediaInfo = `Video - Duración: ${ctx.message.video.duration} segundos`;
    }

    console.log(`
⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰
🕕Hora: ${formatTime()}
Grupo: ${chatTitle}
Tema: ${topic}
Privado: ${isPrivate}
👤Usuario: @${user}
📩Mensaje: ${ctx.message.text || mediaInfo || 'Archivo multimedia recibido'}
Comando: ${command || 'No es un comando'}
⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰
              ↻ ◁ II ▷ ↺
ᴠᴏʟᴜᴍᴇ : ▮▮▮▮▮▮▯▯▯
⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰
    `);
}

// Función para cargar comandos dinámicamente desde subcarpetas
function loadCommands(dir) {
    const folders = fs.readdirSync(dir, { withFileTypes: true }).filter(item => item.isDirectory());

    folders.forEach(folder => {
        const commandPath = path.join(dir, folder.name);
        const files = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

        files.forEach(file => {
            const command = require(path.join(commandPath, file));
            if (typeof command === 'function') {
                command(bot);
                console.log(`Comando cargado: ${folder.name}/${file}`);
            } else {
                console.error(`Error al cargar el comando en ${folder.name}/${file}. Asegúrate de que exporta una función.`);
            }
        });
    });
}

// Cargar todos los comandos desde la carpeta 'commands'
loadCommands(path.join(__dirname, 'commands'));

// Capturar y registrar todos los mensajes
bot.on('message', (ctx) => {
    logMessage(ctx);
});

// Cargar y ejecutar las APIs desde la carpeta 'API'
const apiFiles = fs.readdirSync(path.join(__dirname, 'API')).filter(file => file.endsWith('.js'));

for (const file of apiFiles) {
    const api = require(`./API/${file}`);
    if (typeof api === 'function') {
        api(bot);  // Ejecutar la API pasando el bot
        console.log(`API ${file} cargada y ejecutada.`);
    } else {
        console.error(`Error al cargar la API en ${file}. Asegúrate de que exporta una función.`);
    }
}

// Controlar el tiempo de actividad y parar el bot con el comando "stop"
const startTime = Date.now();

function stopBot() {
    const uptime = Date.now() - startTime;
    const uptimeInMinutes = Math.floor(uptime / 60000);
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // En MB

    let connectionQuality;
    if (uptimeInMinutes < 10) {
        connectionQuality = 'Mala';
    } else if (uptimeInMinutes < 60) {
        connectionQuality = 'Regular';
    } else {
        connectionQuality = 'Buena';
    }

    console.log(`
⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰
🕕Tiempo Activo: ${uptimeInMinutes} minutos
❐Memoria Ram Usada: ${memoryUsage} MB
❐Calidad de Conexión: ${connectionQuality}
⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰
    `);

    bot.stop(() => {
        console.log('Bot detenido');
        console.log('Reiniciando el bot...');
        process.chdir(path.join(__dirname)); // Cambiar al directorio del bot
        exec('node index.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al reiniciar el bot: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return;
            }
            console.log(stdout);
        });
    });
}

// Manejar comandos desde la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if (input.trim() === 'stop') {
        console.log('🔴 Deteniendo el bot...');
        stopBot();
    } else if (input.trim() === 'Actualizar') {
        console.log('🔄 Aplicando cambios y reiniciando el bot...');
        // Reinicia el bot para que los cambios sean efectivos
        process.exit(1);
    } else if (input.trim() === 'Resetiar') {
        console.log('🔄 Reiniciando el bot...');
        process.exit(1);
    } else {
        console.log('Comando no reconocido.');
    }
});

// Iniciar el bot
bot.launch();
console.log('Bot iniciado');