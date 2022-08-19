module.exports.sendingDetails = (bot, user) => {
    bot.sendMessage(user, 'Здесь будут реквезиты', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Все готово']
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        })
    });
}