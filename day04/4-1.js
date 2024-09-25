const fs = require("fs");
 
fs.readFile("day4/input 4.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    let winningNumbers = [], cardNumbers = [];
    let cardPoints = 0, sumTotal = 0;

    arr.forEach (card => {
        winningNumbers = card.split(/\s+[|]\s+/)[0].split(/[:]\s+/)[1].split(/\s+/);
        cardNumbers = card.split(/\s+[|]\s+/)[1].split(/\s+/); //Get an array of all the numbers.

        winningNumbers.forEach(number=> { //Loop over all winning numbers.

            if (cardNumbers.includes(number)) { //If the winning number is found on the card
                if (cardPoints === 0) { 
                    cardPoints = 1; //First match is worth 1 point.
                } else {
                    cardPoints += cardPoints; //Consecutive matches doubles the points.
                };
            };
        });

    sumTotal += cardPoints; //Sum and reset points.
    cardPoints = 0;
    });

console.log ("Total sum is: " + sumTotal);
});