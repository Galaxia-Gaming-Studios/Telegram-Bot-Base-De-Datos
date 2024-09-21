const fs = require('fs');
const path = require('path');

let welcomeActive = false;

module.exports = (bot) => {
    bot.command('on_welcome', (ctx) => {
        welcomeActive = true;
        ctx.reply('🔔 Función de bienvenida activada.');
    });

    bot.command('off_welcome', (ctx) => {
        welcomeActive = false;
        ctx.reply('🔕 Función de bienvenida desactivada.');
    });

    bot.on('new_chat_members', (ctx) => {
        if (welcomeActive) {
            const newMember = ctx.message.new_chat_member;
            const userName = newMember.username ? `@${newMember.username}` : newMember.first_name;

            const mediaDir = path.join(__dirname, '../../file/bot/welcome');
            const files = fs.readdirSync(mediaDir);
            const randomFile = files[Math.floor(Math.random() * files.length)];
            const filePath = path.join(mediaDir, randomFile);

            ctx.replyWithPhoto({ source: filePath }, {
                caption: `
┏┅┅┅┅Bienvenido┅≫
┇@${ctx.botInfo.username}
┇❐${ctx.chat.title}
┇➪${userName}
┇❐Hora 
┇➪${new Date().toLocaleTimeString()}
┇❐Acepta Las Reglas
┇➪ [Reglas](https://docs.google.com/document/d/1NEu0tL-7B4EgAG9-_OOORc2BFesi-UBdgkll_ZDq2uI/edit?usp=drivesdk)
┗┅┅┅┅┅┅┅┅┅┅┅┅≫`,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Aceptar Reglas", callback_data: "accept_rules" }]
                    ]
                }
            });

            bot.telegram.restrictChatMember(ctx.chat.id, newMember.id, {
                permissions: {
                    can_send_messages: false,
                    can_send_media_messages: false,
                    can_send_polls: false,
                    can_send_other_messages: false,
                    can_add_web_page_previews: false,
                    can_change_info: false,
                    can_invite_users: false,
                    can_pin_messages: false
                }
            });
        }
    });

    bot.on('callback_query', (ctx) => {
        if (ctx.callbackQuery.data === 'accept_rules') {
            const userId = ctx.callbackQuery.from.id;

            bot.telegram.restrictChatMember(ctx.chat.id, userId, {
                permissions: {
                    can_send_messages: true,
                    can_send_media_messages: true,
                    can_send_polls: true,
                    can_send_other_messages: true,
                    can_add_web_page_previews: true,
                    can_change_info: false,
                    can_invite_users: false,
                    can_pin_messages: false
                }
            });
            ctx.answerCbQuery('¡Has aceptado las reglas! Ahora puedes escribir.');
        }
    });
};