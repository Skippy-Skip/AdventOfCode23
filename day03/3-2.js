const fs = require("fs");

fs.readFile("day3/input 3.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    const re = /\d/; //regex to check for digits
    let numberStorage = [], gearStorage = []; 
    let stringCounter = 0, digitCounter =1;
    let value = "";
    let sumTotal = 0;

    arr.forEach(string => {  //Loop over each string in the array.

        for (i=0;i<string.length;i++) { //Loop over each character in the string.

            if (re.test(string.charAt(i))) { //Check if character is a digit, and store information.
                value = string.charAt(i);

                while (re.test(string.charAt(i+1))) { //If the next character is also a digit, get the full number.
                    digitCounter++;
                    i++;
                    value += string.charAt(i);
                };

                numberStorage.push({line: stringCounter, index: i, digits: digitCounter, value: +(value)}); //Store data and reset.
                digitCounter = 1;
                value = "";
            };
    
            if (string.charAt(i) === "*") { //Check if character is an asterix and store information.
                gearStorage.push({line: stringCounter, index: i, matchCount: 0, matchValue: 0});
            };
        };
    stringCounter++;
    });

    gearStorage.forEach (gear => { //Loop over all found "gears" (*'s).

        numberStorage.forEach (number => { //Loop over all numbers.

            if ((gear.line -1)  === number.line || //If the * is on an adjacent line to the number.
                gear.line  === number.line||
                (gear.line +1) === number.line) {

                if (gear.index >= (number.index - number.digits) && //If the * is also within the same index numbers,
                    gear.index <= (number.index + 1)) {             //the * is adjactent to the number.

                    if (gear.matchCount ===  0) { // Check if there is already a match made with the gear, if not store info.
                        gear.matchCount++;
                        gear.matchValue = number.value;
                    } else if (gear.matchCount === 1) { //If there is just one match, sum the match values.
                        gear.matchCount++;
                        gear.matchValue = (gear.matchValue * number.value);
                    } else { //If there are more than 2 adjacent numbers, not a valid match. 
                        gear.matchValue = 0;
                    };
                };
            } ;
        });

        if (gear.matchCount !== 2) { //Wipe all the values from gears that had just 1 match.
            gear.matchValue = 0;
        };

        sumTotal += gear.matchValue;
    });

    console.log("Total sum is: " + sumTotal);
});