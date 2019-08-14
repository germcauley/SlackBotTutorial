const SlackBot = require('slackbots');
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const bot = new SlackBot({
    token: 'xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ',
    name: 'SlackAppTut'
})
bot.on('start', () => {
    console.log('starting bot')
    const params = {
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        'random',
        'Hello, I am a new bot!!',
        params
    );
})

bot.on('error', (err) => {
    console.log(err);
})