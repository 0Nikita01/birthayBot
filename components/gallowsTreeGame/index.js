
module.exports = class gallowsTreeGame {
    constructor(bot, userId, database) {
        this.bot = bot;
        this.userId = userId;
        this.wordSaveId = false;
        this.pictureSaveId = false;
        this.database = database;
        this.pictures = require('../../json/textPictures.json');
        this.helth = 7;
        this.usedLetters = "";
    }

    async showHiddenWord(wordSaveId) {
        let word = "";
        for (let i = 0; i < this.data.hiddenWord.length; i++) {
            word += `${this.data.hiddenWord[i]} `;
        }
        console.log(word);
        if (wordSaveId) {
            await this.bot.editMessageText(word, this.wordSaveId);
        } else {
            await this.bot.sendMessage(this.userId, word).then(snapshot => {
            this.wordSaveId = {chat_id: snapshot.chat.id, message_id: snapshot.message_id};
            });
        }
    }
    async showPicture(n, pictureSaveId) {

        if (pictureSaveId) {
            await this.bot.editMessageText(this.pictures[n], this.pictureSaveId);
        } else {
            await this.bot.sendMessage(this.userId, this.pictures[n]).then(snapshot => {
                this.pictureSaveId = {chat_id: snapshot.chat.id, message_id: snapshot.message_id}
            });
        }
    }

    deleteUserMessage(data, mod) {
        const text = `${mod ? "✅" : "❌"}`;
        // this.bot.editMessageText(text, 
        // {
        //     chat_id: data.chat.id,
        //     message_id: data.message_id
        // }).then(snapshot => {
            
        //     console.log(snapshot);
        // })
        this.bot.sendMessage(this.userId, text).then(snapshot => {
            setTimeout(() => {
                this.bot.deleteMessage(snapshot.chat.id, snapshot.message_id);
                this.bot.deleteMessage(data.chat.id, data.message_id);
            }, 2000);
        });
    }

    async checkLetter(letter, data) {
        let indices = [];
        let word = this.data.mainWord;
        let idx = word.indexOf(letter);

        while (idx != -1) {
            indices.push(idx);
            idx = word.indexOf(letter, idx + 1);
        }

        if (indices[0] !== undefined && this.data.hiddenWord.indexOf(letter) === -1) {
            this.usedLetters += letter;
            this.deleteUserMessage(data, true);
            await this.openLetters(indices, letter);
        } else if (this.usedLetters.indexOf(letter) !== -1) {
            this.deleteUserMessage(data, false);
            this.bot.sendMessage(this.userId, "Эта буква уже была! Попробуй другую").then(snapshot => {
                setTimeout(() => {
                    this.bot.deleteMessage(snapshot.chat.id, snapshot.message_id);
                    
                }, 2000);
            }   
            );
        } else {
            if (this.helth <= 0) {
                this.helth--;
                this.endGame();
            } else {
                this.deleteUserMessage(data, false);
                this.bot.sendMessage(this.userId, "Такой буквы в слове нет").then(snapshot => {
                    setTimeout(() => {
                        this.bot.deleteMessage(snapshot.chat.id, snapshot.message_id);    
                    }, 2000);
                });
                this.usedLetters += letter;
                this.helth--;
                this.showPicture(`${7 - this.helth}`, true);
            }
        }
        //console.log("helth = " + this.helth);
    }

    async openLetters(indices, letter) {
        let word = this.data.hiddenWord;
        let arrWord = [];

        for (let i = 0; i < word.length; i++) {
            arrWord.push(word[i]);
        }

        indices.forEach((item) => {
            arrWord[item] = letter;
        })

        word = "";
        arrWord.forEach((item) => {
            word += item;
        })

        this.data.hiddenWord = word;

        if (this.data.hiddenWord === this.data.mainWord) {
            this.endGame()
        }
        this.showHiddenWord(true);
    }

    async startgame() {

        await this.database.getDataOnce('botDatabase/users/' + this.userId + '/game/gallowTree/').then((snapshot) => {
            this.data = snapshot.val()   
        })
        await this.showPicture(`${7 - this.helth}`, false);
        await this.showHiddenWord(false);
        //await this.checkLetter("ы"); 
     
    }

    endGame() {
        if (this.helth <= 0) {
            this.bot.sendMessage(this.userId, "К сожалению, игра окончена\n Победа была близка, но не расстраивайся, чтобы пройти на следующий этап, тебе нужно отправить загаданное слово.\тТак что если есть догадки - отправляй, вдруг повезет)");
        } else {
            this.helth = -1;
            this.bot.sendMessage(this.userId, "Победа!\nТы угадал(а) это слово не просто так, чтобы узнать в чем подвох, жми кнопку и смотри видос)",{
                reply_markup: JSON.stringify({
                    keyboard: [
                        ['Получить видос']
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                })
            })
        }
    }
}

    //    ||*****************||         
    //     */   ___________ \*
    //     *    | /    |     *
    //     *    |/     |     *
    //     *    |      O     *
    //     *    |     /|\    *
    //     *    |     / \    *
    //     *    |            *
    //     *    |            *
    //     *\_______________/*
    //    ||*****************||


      