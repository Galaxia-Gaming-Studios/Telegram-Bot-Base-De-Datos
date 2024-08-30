const fs = require('fs');
const path = require('path');
const os = require('os');
const { Markup } = require('telegraf');

// Función para calcular el tiempo de actividad del bot
function calculateUptime(startTime) {
    const uptime = Date.now() - startTime;
    const uptimeInMinutes = Math.floor(uptime / 60000);
    const hours = Math.floor(uptimeInMinutes / 60);
    const minutes = uptimeInMinutes % 60;
    return { hours, minutes, uptimeInMinutes };
}

// Función para determinar la calidad de la conexión
function getConnectionQuality(uptimeInMinutes) {
    if (uptimeInMinutes < 10) {
        return 'Mala';
    } else if (uptimeInMinutes < 60) {
        return 'Regular';
    } else {
        return 'Buena';
    }
}

// Registrar el tiempo de inicio del bot
const startTime = Date.now();

module.exports = (bot) => {
    bot.command('velocidad', async (ctx) => {
        try {
            const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // En MB
            const responseTime = Math.random().toFixed(2); // Simulación del tiempo de respuesta en ms
            const platform = os.platform() === 'linux' ? 'Android' : os.platform();
            const environment = 'Local';

            const { hours, minutes, uptimeInMinutes } = calculateUptime(startTime);
            const connectionQuality = getConnectionQuality(uptimeInMinutes);

            // Ruta a la carpeta que contiene los archivos multimedia
            const mediaDir = path.join(__dirname, '../../file/bot/velocidad');
            
            // Obtener todos los archivos de la carpeta
            const files = fs.readdirSync(mediaDir);

            // Selecciona un archivo aleatorio
            const randomFile = files[Math.floor(Math.random() * files.length)];
            
            // Ruta completa al archivo seleccionado
            const filePath = path.join(mediaDir, randomFile);

            // Determinar si es una imagen, video o GIF por la extensión
            const isVideo = filePath.endsWith('.mp4') || filePath.endsWith('.mkv') || filePath.endsWith('.avi');
            const isGif = filePath.endsWith('.gif');

            // Crear un teclado con botones
            const keyboard = Markup.inlineKeyboard([
                [Markup.button.url('Soporte Técnico', 'https://youtube.com/watch?v=YQRHrco73g4')],
                [Markup.button.callback('Obtener más información', 'INFO')],
            ]);

            const messageText = `
Velocidad del Bot:
- Memoria RAM Usada: ${memoryUsage} MB
- Tiempo de Respuesta: ${responseTime} ms
- Plataforma: ${platform}
- Entorno de Ejecución: ${environment}
- Tiempo Activo: ${hours} horas y ${minutes} minutos
- Calidad de Conexión: ${connectionQuality}
@${ctx.from.username}`;

            // Enviar el archivo multimedia junto con el mensaje y el teclado
            if (isVideo) {
                await ctx.replyWithVideo({ source: filePath }, { caption: messageText, ...keyboard });
            } else if (isGif) {
                await ctx.replyWithAnimation({ source: filePath }, { caption: messageText, ...keyboard });
            } else {
                await ctx.replyWithPhoto({ source: filePath }, { caption: messageText, ...keyboard });
            }
        } catch (error) {
            console.error('Error al enviar mensaje de velocidad:', error.message);
        }
    });

    // Manejar el botón de "Obtener más información"
    bot.action('INFO', async (ctx) => {
        try {
            await ctx.answerCbQuery(); // Responder al callback
            await ctx.reply('Aquí tienes más información sobre el bot...');
        } catch (error) {
            console.error('Error al responder al CallbackQuery:', error.message);
        }
    });
};