

module.exports.payment = (bot, userId, userName, sendingVideoModule) => {
    bot.sendMessage(userId, 'Пожалуйста, ожидайте...');
    sendingVideoModule.sendingVideo(bot, userId, 'gif_1');
    sendMessageAboutPayment(bot, userId, userName);
}

const sendMessageAboutPayment = (bot, userId, userName) => {
    bot.sendMessage(938017717, 'Новый взнос от пользователя ' + userName, {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {
                       text: 'Подтведить платеж',
                       callback_data: JSON.stringify(['aprovePayment', 'confirm', userId, userName])
                    }
                ],
                [
                    {
                        text: 'Отклонить',
                        callback_data: JSON.stringify(['aprovePayment', 'reject', userId, userName])
                    } 
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        })
    })
}