'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const authToken = '4abd2e18a1e7d470-bf895d5fea2629c7-b296bff270dd40bf';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const bot = new ViberBot({
  authToken: authToken,
  name: "EchoBot",
  avatar: "http://viber.com/avatar.jpg", // It is recommended to be 720x720, and no more than 100kb.
  registerToEvents: ['message']
});

const handlerEroor = e => console.log('error:', e);
const handlerSuccess = e => console.log('success:', e);


bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  console.log('get msg:', message);
  response.send(message).then(handlerSuccess).catch(handlerEroor);
});
bot.onTextMessage(/^hi|hello$/i, (message, response) => {
  console.log('get msg:', message);
  response.send(message).then(handlerSuccess).catch(handlerEroor);
});

bot.onError(handlerEroor);

bot.setWebhook('https://test.com/').then(handlerSuccess).catch(handlerEroor);

// app.use("/viber/webhook", bot.middleware());

module.exports = app;
