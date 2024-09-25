const fs = require("fs");
 
fs.readFile("day9/input 9.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    let sumTotal = 0;

    arr.forEach(sequence => {
        let steps = sequence.split(/\s+/).reverse(); //Same as part 1, but in reverse
        const lastValue = +(steps[steps.length - 1]); //Take the last value of the sequence, in order to add to this later and find the new value.
        let arrLength = steps.length; //Define the length as a set variable, since the length will change during the loop.
        let currentDifference = 0;

        while ([...new Set(steps)].length !== 1) { //Loop till the difference is a steady number and you know the new increment value.
            
            for (let i=0; i<(arrLength-1); i++) { //For all initial numbers in the array, find their difference and add this to the array.
                difference = steps[i+1]-steps[i]; 
                steps.push(difference); 
            };
            
            steps.splice(0,arrLength); //Remove all the numbers over which you looped from the array, leaving only an array of the new differences.
            arrLength = steps.length; 
            currentDifference += steps[arrLength-1]; //Update the current difference to at the end find the new value in the sequence.
        };

        newValue = lastValue + currentDifference; //If the increment is steady, calculate the final value in the sequence.
        sumTotal += newValue;
    });

    console.log("Total sum of new values is: " + sumTotal);
});