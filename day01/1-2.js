const fs = require("fs");

fs.readFile("day1/input 1.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };
    
    const arr = data.split(/\r\n/);
    const numbers = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
     "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];
    let indexArray = [], matchingNumberArray = [];
    let firstNumber = 0, lastNumber = 0, sumTotal = 0;

    arr.forEach(string => { //Loop over each string in the array.

        numbers.forEach(number => { //Loop over all possible spelled out numbers.
            
            switch (number) { // Assign a matching number to spelled out numbers.
                case "one":
                    matchingNumber = "1";
                    break;
                case "two":
                    matchingNumber = "2";
                    break;
                case "three":
                    matchingNumber = "3";
                    break;
                case "four":
                    matchingNumber = "4";
                    break;
                case "five":
                    matchingNumber = "5";
                    break;
                case "six":
                    matchingNumber = "6";
                    break;
                case "seven":
                    matchingNumber = "7";
                    break;
                case "eight":
                    matchingNumber = "8";
                    break;
                case "nine":
                    matchingNumber = "9";
                    break;
                default:
                    matchingNumber = number
            };

            if (string.includes(number)) { 
                let indexNumber = string.indexOf(number); // Find the character index of the number in the string.
                indexArray.push(indexNumber); // Collect all index numbers in an array in order to find the first spelled out number, and the last. 
                matchingNumberArray.push(matchingNumber);  
        
                while (string.includes(number, (indexNumber + 1))) {  // Search for the string at a position higher than the already found index, to check for duplicates.
                    indexNumber = string.indexOf(number, (indexNumber + 1));
                    indexArray.push(indexNumber);
                    matchingNumberArray.push(matchingNumber);
                };
            };                        
        });

        firstNumber = matchingNumberArray[indexArray.indexOf(Math.min(...indexArray))];
        lastNumber = matchingNumberArray[indexArray.indexOf(Math.max(...indexArray))];
        finalNumber = +(firstNumber + lastNumber); //Convert the strings to a number, in order to sum.
        sumTotal += finalNumber;

        indexArray = [], matchingNumberArray = []; //Reset the storage arrays.
    });

    console.log("Total sum is: " + sumTotal);
});
