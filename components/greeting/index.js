const fs = require("fs");

module.exports.greeting = async (bot, user, sendingVideoModule) => {
    
    await bot.sendMessage(user, 'Посмотри меня\nВидео загружается..', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Я за движ']
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        })
    })
    
    await sendingVideoModule.sendingVideo(bot, user, 'video_1');
    // fs.readFile('./videos/Slomaju_odnim_udarom)-spcs.me.mp4', (err, video) => {
    //     if (err) {
    //         bot.sendMessage(user, 'Что-то пошло не так, нажмите на кнопку "Получить видео"', {
    //             reply_markup: JSON.stringify({
    //                 keyboard: [
    //                     ['Получить видео']
    //                 ]
    //             })
    //         })
    //     }
    //     else {
    //         bot.sendVideo(user, video);
    //     }
    // })
}