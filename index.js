const ngrok = require('./ngrock');
const ViberBot = require('./viber-bot').Bot;

// Creating the bot with access token, name and avatar
const bot = new ViberBot(logger, {
    authToken: "4abd2e18a1e7d470-bf895d5fea2629c7-b296bff270dd40bf",
    name: "YOUR_BOT_NAME",
    avatar: "http://viber.com/avatar.jpg"
});

const http = require('http');
const port = process.env.PORT || 8080;
return ngrok.getPublicUrl().then(publicUrl => {
    console.log('Set the new webhook to"', publicUrl);
    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));
}).catch(error => {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
});
