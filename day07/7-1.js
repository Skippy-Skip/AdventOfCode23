const fs = require("fs");
 
fs.readFile("day7/input 7.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    
    let hand = "", bid = "";
    let gameData = [], handInfo = [];
    let highCard = [], onePair = [], twoPairs = [], threeOfAKind = [], fullHouse = [], fourOfaKind = [], fiveOfAKind = [];
   

    for (i=0; i<arr.length; i++) { //Loop over every line to get the card information.
        hand = arr[i].split(/\s+/)[0];
        bid = arr[i].split(/\s+/)[1];

        for (x=0; x<hand.length; x++) {  //For each hand, store all the different cards in a seperate array.        
            handInfo.push(hand.charAt(x));
        };

        determineHandType(handInfo); //Function to determine what handtype you have, depending on the cards in the hand.
            
        gameData.push({hand: hand, bid: bid, type: handType, position: 0}); //Store the found information in an array.

        handInfo = []; //Reset the array for the next hand.
    };

    let searchString = "";
    let compareCardValues = [], furtherComparing = [], currentArray = [];
    let position = 1, counter = 0
    let sumValue = 0, sumTotal = 0;

    for (a=1; a<=7; a++) {
        
        switch(a) { //Determine which array to loop over.
            case 1: 
                currentArray = highCard;
                break;
            case 2:
                currentArray = onePair;
                break;
            case 3:
                currentArray = twoPairs;
                break;
            case 4:
                currentArray = threeOfAKind;
                break;
            case 5:
                currentArray = fullHouse;
                break;
            case 6:
                currentArray = fourOfaKind;
                break;
            case 7: 
                currentArray = fiveOfAKind;
                break;
        }

        while (currentArray.length > 0) { //Every time a position is assigned, the card is removed from the array, so loop over the array till there are no cards left to assign.

            if (compareCardValues.length === 0) { //Only if the array is empty, otherwise it's being used to compare 2nd or 3rd etc card types.
                assignCardValues(currentArray, counter); //Create an array where all values are numerical, e.g. A = 14, in order to compare them.
            };

            lowestValue = Math.min(...compareCardValues); //Get the lowest value out of the numerical array.
            searchString += reverseCardValues(lowestValue); //Take the non numerical version of the card and add it to the string to search for, e.g. 14>A.

            if (compareCardValues.filter(x => x === lowestValue).length === 1) { //If there is an unique lowest value.
                    index = findIndex(currentArray, searchString); //Find the index of the hand matching the search string, in the handtype Array.
                    hand = currentArray[index]; //Find the full hand matching the search string.
                    indexGame = gameData.findIndex( x => x.hand === hand); //Find the specific hand in the full gameData array.
                    gameData[indexGame].position = position; //Assign the position.
                    sumValue = gameData[indexGame].bid * position; //Get the value to sum.
                    sumTotal += sumValue;
                    currentArray.splice(index,1); //Remove the hand from the handType array.

                    position++; //update and reset variables.
                    compareCardValues = [];
                    counter = 0;
                    searchString = "";
            
            } else { //If there is a duplicate of the unique lowest value.
                counter++; //Compare the next card in the hand.
                furtherComparing = createFurtherComparing(currentArray, searchString); //Create an array with only the characters matching the previous duplicate criteria.
                compareCardValues = []; //Reset the array to compare values.
                assignCardValues (furtherComparing, counter); //Build a new array to compare values, with only the fully matching numbers.
            };
            
        };   
    };

    console.log("Total Sum is: " + sumTotal);

    function determineHandType(array) {

        uniqueCards = [...new Set(array)]; //See how many unique cards a hand has, in order to assign it's handType.

        switch (uniqueCards.length) {
            case 5: //If there are 5 unique cards, hand type = 'High card'.
                handType = 'High card';
                highCard.push(hand) ;
                break;
            case 4: //If there are 4 unique cards, hand type = 'One pair'.
                handType = 'One pair';
                onePair.push(hand);
                break;
            case 3: //If there are 3 unique cards, hand type = 'Two pair' or 'Three of a kind'.
                handType = 'Two pair';

                for (y=0; y<3; y++) { //Loop over every card in the unique set.
                 
                    if (handInfo.filter(x => x === uniqueCards[y]).length === 3) { //If a card appears 3 times in the full hand set, hand type = 'Three of a kind'.
                        handType = 'Three of a kind';
                        threeOfAKind.push(hand);
                        break;
                    } 
                    
                }

                if (handType === 'Two pair') {
                    twoPairs.push(hand);
                } 

                break;
            case 2: //If there are 2 unique cards, hand type = 'Full house' or 'Four of a kind'.
                handType = 'Full house'

                for (y=0; y<2; y++) { //Loop over every card in the unique set.

                    if (handInfo.filter(x => x === uniqueCards[y]).length === 4) { //If a card appears 4 times in the full hand set, hand type = 'Four of a kind'.
                        handType = 'Four of a kind';
                        fourOfaKind.push(hand);
                        break;
                    } 
                }

                if (handType === 'Full house') {
                    fullHouse.push(hand);
                } 

                break;
            case 1:  //If there is just 1 unique card, hand type = 'Five of a kind'.
                handType = 'Five of a kind';
                fiveOfAKind.push(hand);
                break;
            default: 
                handType = "Something went wrong here";
        };
    };

    function assignCardValues (array, charIndex) {
    
        for (let i=0; i<array.length; i++) {

            switch (array[i].charAt(charIndex)) {
                case "T":
                    cardValue = 10
                    break;
                case "J":
                    cardValue = 11
                    break;
                case "Q": 
                    cardValue = 12
                    break;
                case "K":
                    cardValue = 13;
                    break;
                case "A":
                    cardValue = 14;
                    break;
                default:
                    cardValue = +(array[i].charAt(charIndex))
                    break;
            };

        compareCardValues.push(cardValue)
        };
    };
        
    function reverseCardValues (value) {

        switch (value) {
            case 10:
                value = "T";
                break;
            case 11:
                value = "J";
                break;
            case 12: 
                value = "Q";
                break;
            case 13:
                value = "K";
                break;
            case 14:
                value = "A";
                break;
            default:
                value = value.toString();
        };

        return value;
    };

    function findIndex (array, string) {

        if (string.length === 1) { 
            index = array.findIndex(x => x.charAt(0) === string.charAt(0));
        } else if (string.length === 2) {
            index = array.findIndex(x => x.charAt(0) === string.charAt(0) &&
                                         x.charAt(1) === string.charAt(1));
        } else if (string.length === 3){
            index = array.findIndex(x => x.charAt(0) === string.charAt(0) &&
                                         x.charAt(1) === string.charAt(1) &&
                                         x.charAt(2) === string.charAt(2));
        } else if (string.length === 4) {
            index = array.findIndex(x => x.charAt(0) === string.charAt(0) &&
                                         x.charAt(1) === string.charAt(1) &&
                                         x.charAt(2) === string.charAt(2) &&
                                         x.charAt(3) === string.charAt(3));
        } else if (string.length === 5) {
            index = array.findIndex(x => x.charAt(0) === string.charAt(0) &&
                                         x.charAt(1) === string.charAt(1) &&
                                         x.charAt(2) === string.charAt(2) &&
                                         x.charAt(3) === string.charAt(3) &&
                                         x.charAt(4) === string.charAt(4));
        };

        return index;
    };

    function createFurtherComparing(array, string) {

        if (string.length === 1) {  
            furtherComparing = array.filter(x => x.charAt(0) === string.charAt(0));
        } else if (string.length === 2) {
            furtherComparing = array.filter(x => x.charAt(0) === string.charAt(0) &&
                                                 x.charAt(1) === string.charAt(1));
        } else if (string.length === 3){
            furtherComparing = array.filter(x => x.charAt(0) === string.charAt(0) &&
                                                 x.charAt(1) === string.charAt(1) &&
                                                 x.charAt(2) === string.charAt(2));
        } else if (string.length === 4) {
            furtherComparing = array.filter(x => x.charAt(0) === string.charAt(0) &&
                                                 x.charAt(1) === string.charAt(1) &&
                                                 x.charAt(2) === string.charAt(2) &&
                                                 x.charAt(3) === string.charAt(3));
        } else if (string.length === 5) {
            furtherComparing = array.filter(x => x.charAt(0) === string.charAt(0) &&
                                                 x.charAt(1) === string.charAt(1) &&
                                                 x.charAt(2) === string.charAt(2) &&
                                                 x.charAt(3) === string.charAt(3) &&
                                                 x.charAt(4) === string.charAt(4));
        };

        return furtherComparing;
    };
});

