module.exports.aprovePayment = (bot, data) => {
    const confirmText = 'Твои денежки дошли!\nДобро пожаловать!';
    const rejectText = 'К сожалению твой вклад не дошел до нас...\nЖми кнопку и немного подожди, произведем повторную проверку';

    const isOk = data[0] === 'confirm' ? true : false;

    if (isOk) {
        bot.sendMessage(data[1], confirmText);
    } else {
        bot.sendMessage(data[1], rejectText, {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Повторить проверку']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            })
        })
    }

    
}