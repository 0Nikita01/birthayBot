const fs = require("fs");

module.exports.greeting = (bot, user) => {
    
    bot.sendMessage(user, 'Посмотри меня\nВидео загружается..', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Я за движ']
            ]
        })
    })

    fs.readFile('./videos/Slomaju_odnim_udarom)-spcs.me.mp4', (err, video) => {
        if (err) {
            bot.sendMessage(user, 'Что-то пошло не так, нажмите на кнопку "Получить видео"', {
                reply_markup: JSON.stringify({
                    keyboard: [
                        ['Получить видео']
                    ]
                })
            })
        }
        else {
            bot.sendVideo(user, video);
        }
    })
}