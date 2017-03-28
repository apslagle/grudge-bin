var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');
var app = express();
var port = process.env.PORT || 1717;
var db = require('./database.js');
var mongoose = require('mongoose')


if(!process.env.PORT) {
  var morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

require('./routes.js')(app, express, db);


app.listen(port, function() {
  console.log('Listening on ' + port);
});

module.exports = {
  app: app,
};
