
const greetingModule = require('./components/greeting/index');
var TelegramBot = require('node-telegram-bot-api');
var token = '1328056925:AAF8Wp7OXpFX5j6fQJ43tuzX3-3rGfKuBD0';

var bot = new TelegramBot(token, {
    polling: true
});

const fs = require("fs");

greetingModule.greeting(bot, 938017717);

bot.on('message', function(msg){
    var id = msg.chat.id,
        first_name = msg.chat.first_name,
        last_name = msg.chat.last_name;
    console.log(msg.text);
});
