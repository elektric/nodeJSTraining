var BlackCards = require('./BlackCards');
var WhiteCards = require('./WhiteCards');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require("path");

let blackCards = new BlackCards('blackCards.txt');
let whiteCards = new WhiteCards('whiteCards.txt');
let blackCardAry = [];
let whiteCardAry = [];
let answerAry = [];
let lastWinner = "";


//Add a prototype to get a random element from the array.
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

blackCards.readInCards().then(resolveMessage => {
      console.log(resolveMessage);
      blackCardAry = blackCards.allBlackCards;
      console.log(blackCardAry.randomElement());
   },
   (err) => {
      console.log(err)
   }
);

whiteCards.readInCards().then(resolveMessage => {
      console.log(resolveMessage);
      whiteCardAry = whiteCards.allWhiteCards;
      console.log(whiteCardAry.randomElement());
   },
   (err) => {
      console.log(err);
   }
);

app.use(express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(__dirname));
app.get('/', function(req, res, next)
{
   res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

    client.on('messages', function(data) {
           client.emit('broad', data);
           client.broadcast.emit('broad',data);
    });

    client.on('choice', function(data) {
           console.log(data);
           answerAry.push(data);
           io.emit('answers', answerAry);
    });

    client.on('winner', function(data) {
           console.log("Winner: " + data);
           lastWinner = data;
           io.emit('lastWinner', answerAry);
    });


});

server.listen(4201);

setInterval( function() {


  var card = blackCardAry.randomElement();
  io.emit('blackcard', card);
  //console.log (msg);
  answerAry = [];
  io.emit('answers', answerAry);

}, 30000);

setInterval( function() {

  var cardArray = [];
  for (i = 0; i < 5; i++)
  {
    cardArray[i] = whiteCardAry.randomElement();
  }

  io.emit('whitecards', cardArray);

}, 30000);
