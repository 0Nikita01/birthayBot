
const greetingModule = require('./components/greeting/index');
const sendingDetailsModule = require('./components/sendingDetails/index');
const paymentModule = require('./components/payment/index');
const aprovePaymentModule = require('./components/aprovePayment/index');
const aboutGameModule = require('./components/aboutGame/index');
const sendingVideoModule = require('./components/sendingVideo/index');
const waitingModule = require('./components/waiting/index');
const socetConnectionModule = require('./components/socetUpdate/index');

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
socetConnectionModule.socetConnection(database);

/* Запуск бота с функции приветсвия */
greetingModule.greeting(bot, 938017717, sendingVideoModule);

bot.on('message', function(msg){
    var id = msg.chat.id,
        first_name = msg.chat.first_name,
        last_name = msg.chat.last_name;

    if (msg.text === "Я за движ") {
        console.log(`${mainPath}/${id}/isAbleToCome`);
        database.postData(`${mainPath}/${id}/isAbleToCome`, true);
        sendingDetailsModule.sendingDetails(bot, id);
    }
    if (msg.text === 'Все готово' || msg.text === 'Повторить проверку') {
        //waitingModule.waiting(bot, id);
        paymentModule.payment(bot, id, first_name, sendingVideoModule);
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
