const fs = require("fs");
 
fs.readFile("day4/input 4.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    let winningNumbers = [], cardNumbers = [], cardOccurences = [];
    let cardCounter = 0, matchCounter = 0, sumTotal = 0;

    for (i=0; i< arr.length; i++) { //Create an array containing the amount of occurences of each card.
        cardOccurences.push(1); //You start with 1 of each cards.
     };

    arr.forEach (card => { 

        winningNumbers = card.split(/\s+[|]\s+/)[0].split(/[:]\s/)[1].split(/\s+/);
        cardNumbers = card.split(/\s+[|]\s+/)[1].split(/\s+/); //Get an array of all the numbers.

        winningNumbers.forEach(number=> { //Loop over every winning number.

            if (cardNumbers.includes(number)) { //If the winning number is found on the card
                matchCounter++ ;
                //Update the new card occurences, with their new value (+1 for each of the current cards)
                cardOccurences[(cardCounter + matchCounter)] += cardOccurences[cardCounter];
            };
        });

    sumTotal += +(cardOccurences[cardCounter]); //Add the amount of current cards to the total.
    cardCounter ++; //Update and reset variables.
    matchCounter = 0;
    });

    console.log ("Amount of scratch cards: " + sumTotal);
});

