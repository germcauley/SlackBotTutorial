const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBot({
  token: "xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ",
  name: "SlackAppTut"
});

// var url = "https://slack.com/api/users.list?token=xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ&pretty=1";

//Gets status from slack
function getLocStatus() {
  var url =
    "https://slack.com/api/users.list?token=xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ&pretty=1";
  axios.get(url).then(function(result) {});
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

function axiosTest() {
  
  var url =
    "https://slack.com/api/users.list?token=xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ&pretty=1";
  axios
    .get(url)
    .then(function(res) {
      console.log(res.data.members[0].name);
     
    })
    .catch(function(error) {
      console.log(error);
    });
 
}

function getDataPromise() {
    return axios({
            url: 'https://slack.com/api/users.list?token=xoxb-258246538437-726161173040-mZLuO53L0EFXcYUuO8KcjTwZ&pretty=1',
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
       .then(res => res.data.members[0].name)
       .catch (err => console.error(err))
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
    showStatus();
  }
 else if (message.includes("I'm good")) {
    sayGreat()
  }
}

bot.on("error", err => {
  console.log(err);
});

function sayHi() {
  bot.postMessageToChannel("general", "Hello, there!");
  bot.postMessageToChannel("general", "How are you?");
}

function sayHelp() {
  bot.postMessageToChannel("general", "How can I help you?");
}

function sayGreat() {
    bot.postMessageToChannel("general", "Thats great! :)");
  }

function showStatus() {
  
  var status = getDataPromise()
  .then(res => console.log(res))

  console.log(status + "in function!!");

  bot.postMessageToChannel("general", "message from API");
}
