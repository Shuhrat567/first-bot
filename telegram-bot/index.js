const TelegramBot = require('node-telegram-bot-api');
const {gameOption, againOption} = require('./options');

const token = '6945512695:AAG1fb4YKInKQBXnV_PGT3_gZvJNX_TcPnQ';

const bot = new TelegramBot(token, {polling: true});

const obj = {};


const startGame = async chatId => {
    await bot.sendMessage(
        chatId, 
        "Kompyuter 0 dan 9 gacham son o'yalydi. Siz o'sha sonni topishga harakat qiling"
    );
    const randomNumber = Math.floor(Math.random() * 10);
    obj[chatId] = randomNumber;
    await bot.sendMessage(
        chatId, 
        "O'yin boshlandi", 
        gameOption
    );
}

const bootstrap = () => {
    bot.setMyCommands([
        {
            command: '/start',
            description: 'Botni ishga tushurish'
        },
        {
            command: '/info',
            description: "O'zingiz haqingizda ma'lumot"
        },
        {
            command: '/game',
            description: "O'yin o'ynash"
        },
    ])
}

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
  
    if (text === '/start') {
       return bot.sendMessage(
        chatId,
        `Assalomu aleykum xurmatli ${msg.from.first_name} sizni o'quv botimizda ko'rib turganimizdan juda xursandman.`);
    }
    
    if (text === '/info') {
        await bot.sendSticker(
            chatId,
            'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/11.webp')
        return bot.sendMessage(
            chatId,
            `Sizning telegram username bu ${msg.from?.username}, sizning ismingiz esa ${msg.from?.first_name} ${msg.from?.last_name} 
        Men sening telegramingga ulandim va ehtiyot bo'l`);
    }

    if(text === "/game") {
        return startGame(chatId);
    }

    bot.sendMessage(
        chatId,
        `Uzur men sizning gapingizga chunmayapman`
    );
});

bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
        return startGame(chatId);
    }

    if(data == obj[chatId]) {
        return bot.sendMessage(`Tabriklaymiz siz to'g'ri javob berdingiz, kompyuter ${obj[chatId]} sonini tanlagan edi`
        );
    } else {
        return bot.sendMessage(chatId, `Siz to'g'ri javob berdingiz tanlagan soningiz ${data}, kompyuter ${obj[chatId]} sonini tanlagan edi`,
        againOptions
        );
    }

    bot.sendMessage(chatId, `Sizning javob ${data}`);
});

bootstrap();