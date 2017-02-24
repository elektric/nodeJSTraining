var BlackCards = require('./BlackCards');
var WhiteCards = require('./WhiteCards');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

let blackCards = new BlackCards('blackCards.txt');
let whiteCards = new WhiteCards('whiteCards.txt');
let blackCardAry = [];
let whiteCardAry = [];

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

app.use(express.static(__dirname + '/node_modules'));
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

});

server.listen(4200);
