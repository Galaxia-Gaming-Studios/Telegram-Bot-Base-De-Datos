const fs = require('fs');
const os = require('os');
const path = require('path');
const si = require('systeminformation'); // Necesitarás instalar esta librería
const ping = require('ping');
const axios = require('axios');

module.exports = (bot) => {
    bot.command('velocidad', async (ctx) => {
        try {
            // Verificación de la conexión a internet (ping)
            const pingResult = await ping.promise.probe('google.com');
            let internetStatus = '';
            if (pingResult.avg < 100) {
                internetStatus = 'Excelente';
            } else if (pingResult.avg < 200) {
                internetStatus = 'Bueno';
            } else if (pingResult.avg < 300) {
                internetStatus = 'Regular';
            } else {
                internetStatus = 'Malo';
            }

            // Obtener la memoria total y la memoria usada
            const totalMem = os.totalmem();
            const freeMem = os.freemem();
            const usedMem = totalMem - freeMem;

            const totalMemGB = (totalMem / (1024 ** 3)).toFixed(2); // Convertimos a GB
            const usedMemGB = (usedMem / (1024 ** 3)).toFixed(2);   // Convertimos a GB

            // Entorno de ejecución
            const platform = os.platform();
            let environment = '';
            switch (platform) {
                case 'linux':
                    environment = 'Linux';
                    break;
                case 'darwin':
                    environment = 'Mac';
                    break;
                case 'win32':
                    environment = 'Windows';
                    break;
                default:
                    environment = 'Desconocido';
            }

            // Herramienta de ejecución
            let executionTool = '';
            if (platform === 'linux' && os.userInfo().username.includes('termux')) {
                executionTool = 'Termux';
            } else if (platform === 'linux' && !os.userInfo().username.includes('termux')) {
                executionTool = 'Hosting Linux';
            } else if (platform === 'win32') {
                executionTool = 'Acode o Windows';
            } else {
                executionTool = 'Hosting';
            }

            // Multimedia aleatoria
            const mediaDir = path.join(__dirname, '../../file/menu0/velocidad');
            const files = fs.readdirSync(mediaDir);
            const randomFile = files[Math.floor(Math.random() * files.length)];
            const filePath = path.join(mediaDir, randomFile);
            const isVideo = filePath.endsWith('.mp4') || filePath.endsWith('.mkv') || filePath.endsWith('.avi');
            const isGif = filePath.endsWith('.gif');

            // Formato de mensaje
            const message = `
┏╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┓
╏*❒Internet*
╏➩ ${internetStatus}
╏
╏*❒Ram Total* 
╏➩ ${totalMemGB} GB
╏
╏*❒Ram Usada*
╏➩ ${usedMemGB} GB
╏
╏*❒Ping*
╏➩ ${pingResult.avg} ms
╏
╏*❒Entorno De Ejecución*
╏➩ ${environment}
╏
╏*❒Herramienta De Ejecución*
╏➩ ${executionTool}
┗╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛
`;

            // Crear botones
            const buttons = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Regresar al menú', callback_data: 'menu1' }]
                    ]
                }
            };

            // Enviar el archivo multimedia según el tipo
            if (isVideo) {
                await ctx.replyWithVideo({ source: filePath }, { caption: message, parse_mode: 'Markdown', ...buttons });
            } else if (isGif) {
                await ctx.replyWithAnimation({ source: filePath }, { caption: message, parse_mode: 'Markdown', ...buttons });
            } else {
                await ctx.replyWithPhoto({ source: filePath }, { caption: message, parse_mode: 'Markdown', ...buttons });
            }

        } catch (error) {
            console.error('Error al procesar el comando /velocidad:', error);
            ctx.reply('⚠️ Ocurrió un error al procesar su solicitud.');
        }
    });

    // Acción del botón "menu1" - Redirigir al menú principal
    bot.action('menu1', (ctx) => {
        ctx.reply('Has regresado al menú principal.');
        ctx.answerCbQuery(); // Responder a la acción del botón
    });
};