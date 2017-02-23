var http = require('http');
var BlackCards = require('./BlackCards');
var WhiteCards = require('./WhiteCards');


let blackCards = new BlackCards('blackCards.txt');
let whiteCards = new WhiteCards('whiteCards.txt');

blackCards.readInCards().then(resolveMessage => {

      for (let blackCard of blackCards.allBlackCards)
      {
         console.log(blackCard);
      }
      console.log(resolveMessage);
   },
   (err) => {
      console.log(err)
   }
);

whiteCards.readInCards().then(resolveMessage => {

      for (let whiteCard of whiteCards.allWhiteCards)
      {
         console.log(whiteCard);
      }
      console.log(resolveMessage);
   },
   (err) => {
      console.log(err);
   }
);
