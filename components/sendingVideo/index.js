const fs = require("fs");

module.exports.sendingVideo = (bot, user, url) => {
    bot.sendMessage(user, "###Video - " + url + "###");
    // fs.readFile(url, (err, video) => {
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
    //         //bot.sendVideo(user, video);
    //         bot.sendMessage(user, "###Video - " + url + "###");
    //     }
    // })
}