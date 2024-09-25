const fs = require("fs");

fs.readFile("day2/input 2.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    let maxRed = 12, maxGreen = 13, maxBlue = 14;
    let dataStorage = {green: [], red: [], blue: []};
    let sumTotal = 0;

    arr.forEach(game => {
        gameID = +(game.split(/[:\s]/)[1]); //Convert to a number, in order to sum later.
        cubeNumbers = game.split(/[:;,]+/); //Create a data set of all the different coloured picks.
        cubeNumbers.splice(cubeNumbers.indexOf("Game " + gameID), 1); //Removes the gameID from the data set.

        cubeNumbers.forEach(set => { //Adds the amount of picked colour cubes to the corresponding storage arrays.
            if (set.includes("blue")) { 
                dataStorage.blue.push(+(set.split(/\s/)[1]));
            };
            if (set.includes("red")) {
                dataStorage.red.push(+(set.split(/\s/)[1]));
            };
            if (set.includes("green")) {
                dataStorage.green.push(+(set.split(/\s/)[1]));
            };
        });

        if ((Math.max(...dataStorage.blue) <= maxBlue) && //Check if the highest amount of cubes used is lower than the stated amount.
            (Math.max(...dataStorage.red) <= maxRed) && 
            (Math.max(...dataStorage.green) <= maxGreen)) {
                sumTotal += gameID; 
        };

        dataStorage = {green: [], red: [], blue: []}; //Reset the storage object.
    });        

    console.log("Total sum is: " + sumTotal);
});