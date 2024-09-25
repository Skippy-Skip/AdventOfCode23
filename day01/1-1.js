const fs = require("fs");

fs.readFile("day1/input 1.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    let sumTotal = 0;

    arr.forEach(string => {
        newString = string.replace(/[^1-9]/g, ''); //Replace the string with a new string, with all non 1-9 numeric characters removed.
        length = newString.length;
        finalNumber = +(newString.charAt(0) + newString.charAt(length-1)); //Convert the strings to a number, in order to sum.
        sumTotal += finalNumber;
    });

    console.log("Total sum is: " + sumTotal);
});

 