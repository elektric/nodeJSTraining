var BlackCards = require('./BlackCards');
var WhiteCards = require('./WhiteCards');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

let blackCards = new BlackCards('blackCards.txt');
let whiteCards = new WhiteCards('whiteCards.txt');

blackCards.readInCards().then(resolveMessage => {

      // for (let blackCard of blackCards.allBlackCards)
      // {
      //    console.log(blackCard);
      // }
      console.log(resolveMessage);
   },
   (err) => {
      console.log(err)
   }
);

whiteCards.readInCards().then(resolveMessage => {

      // for (let whiteCard of whiteCards.allWhiteCards)
      // {
      //    console.log(whiteCard);
      // }
      console.log(resolveMessage);
   },
   (err) => {
      console.log(err);
   }
);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next)
{
   res.sendFile(__dirname + 'index.html');
});
server.listen(4200);
