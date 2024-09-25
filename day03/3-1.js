const fs = require("fs");
 
fs.readFile("day3/input 3.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    const re = /\d/;
    let dataStorage = [];
    let stringCounter = 0, digitCounter = 1;
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

                    dataStorage.push({line: stringCounter, index: i, digits: digitCounter, value: +(value)}); //Store data and reset.
                    digitCounter = 1;
                    value = "";
                };
            };

        stringCounter++;
    });
   
    dataStorage.forEach (number => { //Loop over each number to check if it should be added

        let stringAbove = arr[(number.line -1)];
        let stringBelow = arr[(number.line +1)];
        let currentString = arr[number.line];

        let adjacentLeft = currentString.charAt(number.index - number.digits);
        let adjacentRight = currentString.charAt(number.index +1);

        if (number.line === 0) { //If it's the first string, there is no string above.
            stringAbove = "";
        } else if (number.line === (arr.length - 1)) { //If it's the last string, there is no string below.
            stringBelow = "";
        };

        let startIndex = (number.index - number.digits);

        if (startIndex < 0) { //You can't slice a string starting from an index < 0.
            startIndex = 0;
        };

        let adjacentAbove = stringAbove.slice(startIndex,(number.index+2));
        let adjacentBelow = stringBelow.slice(startIndex,(number.index+2));

        if (adjacentAbove.replaceAll(".", "").length > 0 || //Check if there is any non "." adjacent symbol.
            adjacentBelow.replaceAll(".", "").length > 0 ||
            adjacentLeft.replaceAll(".", "").length > 0 ||
            adjacentRight.replaceAll(".", "").length > 0)
        {
            sumTotal += number.value;
        };
    });
 
    console.log("Total sum is: " + sumTotal);
});