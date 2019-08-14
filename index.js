const SlackBot = require('slackbots');
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const bot = new SlackBot({
    token: 'xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ',
    name: 'SlackAppTut'
})

url = 'https://slack.com/api/users.list?token=xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ&pretty=1'


//Gets status from slack
function getLocStatus(url){
    results =[]
    axios.get(url)
      .then(function(response) {
          x = (response.data.members).length
          for(var i=0; i <x; i++){
              results.push(response.data.members[i].name) 
              results.push(response.data.members[i].profile.status_text)
            // console.log("User: "+ response.data.members[i].name);
            // console.log("Status: "+response.data.members[i].profile.status_text);
          }
      }).catch(function(error) {
         console.log(error.response.data);
      });
      return ['blah'] ;
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
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
    if(message.includes('hello')) {
        console.log('run sayHi')
        sayHi()
    } else if(message.includes('help')) {
        console.log('run help')
        
        help()
    } 
    else if(message.includes('status')){
        showStatus()
        console.log('There are x desks')
    }
}

bot.on('error', (err) => {
    console.log(err);
})

function sayHi(){
    bot.postMessageToChannel(
        'general',
        'Hello, there!'   
    );
}

function showStatus(){
    status = getLocStatus()

    bot.postMessageToChannel(
        'general',
         status   
    );
}