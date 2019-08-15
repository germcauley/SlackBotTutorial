const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config()

const bot = new SlackBot({
    token: 'xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ',
    name: 'SlackAppTut'
})

// var url = "https://slack.com/api/users.list?token=xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ&pretty=1";


//Gets status from slack
function getLocStatus() {
    var url = "https://slack.com/api/users.list?token=xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ&pretty=1";
    axios.get(url).then(function (result) {
        
    });
}
//   x = (response.data.members).length
//   for(var i=0; i <x; i++){
//     //   response.data.members[i].name
//     //   response.data.members[i].profile.status_text
//     console.log("User: "+ response.data.members[i].name);
//     t.push("User: "+ response.data.members[i].name);
//     // return "User: "+ response.data.members[i].name;
//     console.log("Status: "+response.data.members[i].profile.status_text);
//   }


function axiosTest () {
    var url = "https://slack.com/api/users.list?token=xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ&pretty=1";
    var strr = [];
       axios.get(url)
      .then(function(response){
             return response.data.json
       })
       .catch(function(error){
              console.log(error);
          });
      return 
}   


bot.on('start', () => {
    console.log('starting bot')
    const params = {
        icon_emoji: ':robot_face:'

    }
    console.log()
})

// Message Handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
    if (message.includes('hello')) {
        console.log('run sayHi')
        sayHi()
    } else if (message.includes('help')) {
        console.log('run help')
        sayHelp()
    } else if (message.includes('status')) {
        showStatus()
    }
}

bot.on('error', (err) => {
    console.log(err);
})

function sayHi() {
    bot.postMessageToChannel(
        'general',
        'Hello, there!'
    );
}

function sayHelp() {
    bot.postMessageToChannel(
        'general',
        'How can I help you?'
    );
}

function showStatus() {

    status = axiosTest();

    console.log(status);
    bot.postMessageToChannel(
        'general',
        status
    );
}