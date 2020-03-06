var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var mSocket = null;

// var mongoose    = require('mongoose');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});

app.use(express.static('public'));
app.use("/views", express.static('./views/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var router = require('./router/main')(app, io);
