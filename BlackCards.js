const fs = require('fs');

class BlackCards {
   constructor(path) {
      this.path = path;
   }
   readInCards() {
      var blackCards = this;
      return new Promise((resolve, reject) => {
            fs.readFile(this.path, function(err, data) {
                  if (err) {
                     reject(err);
                  }
                  else{
                     blackCards.allBlackCards = data.toString().replace(/(\r)/gm,"").split("\n");
                  resolve("Successfully read in the cards");
               }
            });
      });
}
}

module.exports = BlackCards;
