const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'SlackAppTut'
})


bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        'random',
        'Get inspired while working with @inspirenuggets',
        params
    );
})

bot.on('error', (err) => {
    console.log(err);
})