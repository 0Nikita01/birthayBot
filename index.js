
const greetingModule = require('./components/greeting/index');
const sendingDetailsModule = require('./components/sendingDetails/index');
const paymentModule = require('./components/payment/index');
const aprovePaymentModule = require('./components/aprovePayment/index');
const aboutGameModule = require('./components/aboutGame/index');
const sendingVideoModule = require('./components/sendingVideo/index');
const waitingModule = require('./components/waiting/index');
const socetConnectionModule = require('./components/socetUpdate/index');
const gallowsTreeGameModule = require('./components/gallowsTreeGame/index');


const Firebase = require('./service/firebase.js');
const mainPath = 'botDatabase/users';

/* Инициализация бота */
var TelegramBot = require('node-telegram-bot-api');
var token = '1328056925:AAF8Wp7OXpFX5j6fQJ43tuzX3-3rGfKuBD0';
var bot = new TelegramBot(token, {
    polling: true
});

/* Подключение соединения в режиме реального времени с бд Firebase */
const database = new Firebase();

//socetConnectionModule.socetConnection(database);

/* Запуск бота с функции приветсвия */

//greetingModule.greeting(bot, 938017717, sendingVideoModule);

/*Инициализация игры Виселица*/
const game = new gallowsTreeGameModule(bot, 938017717, database);

bot.on('message', function(msg){
    var id = msg.chat.id,
        first_name = msg.chat.first_name,
        last_name = msg.chat.last_name,
        text = msg.text;
    

    if (msg.text === "Я за движ") {
        database.postData(`${mainPath}/${id}/isAbleToCome`, true);
        sendingDetailsModule.sendingDetails(bot, id);
    }

    if (msg.text === 'Все готово' || msg.text === 'Повторить проверку') {
        paymentModule.payment(bot, id, first_name, sendingVideoModule);
    }

    if (text === "Начать игру") {
        let txt = "Игра \"Виселица\"\nПравила иры:\nТы перед собой видишь слово, которое я загадал.\nТвоя задача его отгадать за определенное количество попыток\nЗа каждую неверную букву будет дорисовываться виселица\nКогда человек будет на ней повешен - это значит ты проиграл. В любом случае, тебе сообщат, когда проиграешь))\nПрисылай ровно по 1 букве, которые, ты думаешь, есть в этом слове\nРазрешенные буквы: а-я, А-Я\n\nП-с-с, слово очень сложное, оно пишется через дефис, я сразу тебе его поставлю\nЖелаю удачи!";
        bot.sendMessage(id, txt, {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Играть']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            })
        });    
    }

    if (text === "Играть") {
        game.startgame();
    }

    // if (text === "Погнали") {
    //     console.log("начали игру");
    //     game.startgame();
    // }

    if (text === "Получить видос") {
        sendingVideoModule.sendingVideo(bot, id, "video-3");
    }

    if (game.helth >= 0 && text.length === 1 && 
        ((text.charCodeAt() >= 'a'.charCodeAt() && text.charCodeAt() <= 'я'.charCodeAt()) || 
        (text.charCodeAt() >= 'А'.charCodeAt() && text.charCodeAt() <= 'Я'.charCodeAt()))
        ){
        game.checkLetter(text.toLowerCase(), msg);
        
    }
});

bot.on('callback_query', (cb) => {
    const callbackData = JSON.parse(cb.data);
    
    const msg_id = cb.message.message_id;
    const chat_id = cb.from.id;

    if (callbackData[0] === 'aprovePayment') {
        aprovePaymentModule.aprovePayment(bot, callbackData.slice(1));
        switch (callbackData[1]) {
            case 'confirm' :
                database.postData(`${mainPath}/${callbackData[2]}/isPay`, true);
                aboutGameModule.aboutGame(bot, callbackData[2], sendingVideoModule);
                bot.editMessageText(`Оплата пользователя ${callbackData[3]} подтверждена✅`, 
                {
                    chat_id: cb.message.chat.id,
                    message_id: cb.message.message_id
                });
                break;
            case 'reject' :
                bot.editMessageText(`Оплата пользователя ${callbackData[3]} отклонена❌`,
                {
                    chat_id: cb.message.chat.id,
                    message_id: cb.message.message_id
                });
                break;
            default :
                break;
        }

    }
});
