var http = require('http');
var BlackCards = require('./BlackCards');

// http.createServer((request, response) =>{
//   console.log("got a request:");
//   console.log(request.headers.host);
//   response.end("<html><body>Hello World<html><body>");
//   console.log("Sent response");
// }).listen(8081);

let blackCards = new BlackCards('blackCards.txt');
blackCards.readInCards().then(resolveMessage => {

      for (let blackCard of blackCards.allBlackCards)
      {
         console.log(blackCard);
      }
      console.log(resolveMessage);
   },
   (e) => {
      console.log(e)
   }
);
