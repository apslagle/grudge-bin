var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');
var app = express();
var port = process.env.PORT || 1717;
var db = require('./database.js');
var mongoose = require('mongoose')

var MONGODB_URI = "mongodb://heroku_30tmj194:rdg630t7ic9me2judc5bgd92p6@ds053176.mlab.com:53176/heroku_30tmj194";
mongoose.connect(MONGODB_URI);

var data = mongoose.connection;
data.on('error', console.error.bind(console, 'connection error:'));
data.once('open', function() {
  console.log('Mongodb connection open');
});


if(!process.env.PORT) {
  var morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

require('./routes.js')(app, express, db);

//send messages once every minute using node's timers module


app.listen(port, function() {
  console.log('Listening on ' + port);
});

module.exports = {
  app: app,
};
