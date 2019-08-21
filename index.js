const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBot({
  
  token: `${process.env.bot_token}`,
  name: "SlackAppTut"
});

//Gets status from slack

function axiosTest() {
  officeCount =0;
  wfhCount =0;
  var url =`${process.env.url}`;
  axios
    .get(url)
    .then(function(res) {
      x = (res.data.members).length
      for(var i=0; i <x; i++){
        if(res.data.members[i].profile.status_text == "office"){
          officeCount+=1;
        }
        else if (res.data.members[i].profile.status_text =="wfh"){
          wfhCount+=1;
        }
        // return "User: "+ response.data.members[i].name;
        console.log("Run bot");
      }
    bot.postMessageToChannel("general", "Number of people in office: "+ officeCount.toString());
    bot.postMessageToChannel("general", "Number of people wfh: "+ wfhCount.toString());
    })
    .catch(function(error) {
      console.log(error);
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
  if (message.includes("hello")) {
    console.log("run sayHi");
    sayHi();
  } else if (message.includes("help")) {
    console.log("run help");
    sayHelp();
  } else if (message.includes("status")) {
    axiosTest()
  }
 else if (message.includes("I'm good")) {
    sayGreat()
  }
}

bot.on("error", err => {
  console.log(err);
});

function sayHi() {
  bot.postMessageToChannel("general", "Hello, there Diana!");
  bot.postMessageToChannel("general", "How are you?");
}

function sayHelp() {
  bot.postMessageToChannel("general", "How can I help you?");
}

function sayGreat() {
    bot.postMessageToChannel("general", "Thats great! :)");
  }

