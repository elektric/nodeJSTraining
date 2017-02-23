const fs = require('fs');

class WhiteCards {
    constructor(path) {
        this.path = path;
    }
    readInCards() {
        var whiteCards = this;
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    whiteCards.allWhiteCards = data.toString()
                        .replace(/(\r)/gm, "").split("\n");
                    resolve("Successfully read in the white cards");
                }
            });
        });
    }
}

module.exports = WhiteCards;
