![GitHub Logo](hotdeskimage.png)

# SlackHotDeskBot
> Slack Bot which gives you the current status of users in a workspace

[![GitHub forks](https://img.shields.io/github/forks/germcauley/SlackBotTutorial.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/germcauley/SlackBotTutorial/network/)

SlackHotDeskBot gets the status of all users in a workspace and outputs the number of people who currently have status set to 'office' or 'wfh' (Working from home) . It uses the slackbots.js node package and axios to make requests to slack API
https://www.npmjs.com/package/slackbots




## Getting Started

   * Clone/Download project
   * Create a .env file in the same directory as index.js that looks like this:
      ```
         bot_token = MY SLACK BOT TOKEN
         url = MY SLACK WORKSPACE URL
      ```
   * add a bot user to your workspace using the guide here: 
  ``` 
  * https://slack.com/intl/en-ie/help/articles/115005265703-create-a-bot-for-your-workspace
  * https://api.slack.com/bot-users
```
   * run 
   ```
   npm start
   ```
   
## Usage example

Originally created as a way to make it easier for Agile workforces to get information about the number of desks available in their hotdesking workspace



