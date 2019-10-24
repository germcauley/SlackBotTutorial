const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");


dotenv.config();

const bot = new SlackBot({
  
  token: `${process.env.bot_token}`,
  

  name: "HotDeskBot"
});

//Gets Desk status from slack

function reportDesks() {
  officeCount =0;
  wfhCount =0;
  seatCount =16;
  var url =`${process.env.url}`;

  //make API request using axios
  axios
    .get(url)
    .then(function(res) {
      x = (res.data.members).length
      for(var i=0; i <x; i++){
        if(res.data.members[i].profile.status_text == "office"){
          officeCount+=1;
          seatCount -=1;
        }
        else if (res.data.members[i].profile.status_text =="wfh"){
          wfhCount+=1;
          
        }
        // return "User: "+ response.data.members[i].name;       
      }
    bot.postMessageToChannel("random", "Number of people in office 🏢 : "+ officeCount.toString());
    bot.postMessageToChannel("random", "Number of people wfh 🏡 : "+ wfhCount.toString());
    bot.postMessageToChannel("random", "There are around: "+ seatCount.toString()+" seats free in the office today. ");
    })
    .catch(function(error) {
      // console.log(error);
    });
 
}

bot.on("start", () => {
  console.log("starting bot");
  const params = {
    icon_emoji: ":robot_face:"
  };
  console.log();
});

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

// Response Handler
function handleMessage(message) {
  // console.log(message);
  if (message.includes("hello")) {
    console.log("run sayHi");
    sayHi();
  } 
  else if(message.includes("xxx")){
    block();
  }
  else if (message.includes("help")) {
    console.log(message)
    console.log("run help");
    sayHelp();
  } else if (message.includes("desk update") && !(message.includes("info"))) {
    reportDesks();
  }
 else if (message.includes("I'm good")) {
    sayGreat();
  }
}

bot.on("error", err => {
  console.log(err);
});

function sayHi() {
  bot.postMessageToChannel("random", "Hello, there User");
  bot.postMessageToChannel("random", "How are you? 😀");
}

function sayHelp() {
  bot.postMessageToChannel("random", "Type 'desk update' in random channel to receive info on Desk availability");
}

function sayGreat() {
    bot.postMessageToChannel("random", "Thats great! 😀:)");
  }

const weburl = `${process.env.webhookUrl}`;
const seatlayout = `${process.env.layout}`;

function block(){
  axios({method:'post',
        url: weburl,
        data:{
          "text": "Would you like to book a desk?",
    "attachments": [
        {
            "text": "Choose a desk",
            "fallback": "You are unable to choose a seat",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "seat",
                    "text": "1",
                    "type": "button",
                    "value": "1"
                },
                {
                    "name": "seat",
                    "text": "2",
                    "type": "button",
                    "value": "2"
                },
                {
                    "name": "seat",
                    "text": "3",
                    "style": "danger",
                    "type": "button",
                    "value": "3",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer to work from home?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
                ,
                {
              "type": "divider"
                },
            ]
        }
    ]
        }
      })
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });
}
