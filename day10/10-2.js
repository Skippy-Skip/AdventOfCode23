const fs = require("fs");
 
fs.readFile("day10/input 10.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/); 
    const lastLine = arr.length;
    const lastIndex = arr[0].length;
    let gridData = [], emptyGrid = [];
    let emptyLine = "";

    for (let i=0; i<lastIndex; i++) { //Create a string without pipes, matching the width of the normal grid.
        emptyLine += ".";
    };

    let lineCounter = 0;
    let startingLine = 0, startingIndex = 0;

    arr.forEach (line => {  //Get the pipe layout, and find the starting point.
   
        if (line.includes("S")) {
            startingLine = lineCounter;
            startingIndex = line.indexOf("S");
        };

        gridData.push(line);
        emptyGrid.push(emptyLine);
        lineCounter++;
    });


    let pipeGrid = JSON.parse(JSON.stringify(emptyGrid)); //Create a copy of the empty grid with new references, so it can be updated without modifying the original.
    let currentLine = startingLine;
    let currentIndex = startingIndex;
    let charLeft = gridData[startingLine].charAt(startingIndex-1);
    let charRight = gridData[startingLine].charAt(startingIndex+1);

    if (currentLine === 0) { //There is no character above if the pipe is at the top.
        charAbove = "";
        charBelow = gridData[startingLine+1].charAt(startingIndex);
    } else if (currentLine === (lastLine) ) { //There is no character below if the pipe is at the bottom.
        charAbove = gridData[startingLine-1].charAt(startingIndex);
        charBelow = "";
    } else {
        charAbove = gridData[startingLine-1].charAt(startingIndex);
        charBelow = gridData[startingLine+1].charAt(startingIndex);
    };

    // From the start point, determine the amount of suitable adjacent pipes to see where travel is possible.
    let startingTravel = {left: false, down: false, right: false, up: false};

    if (charLeft === "-" || charLeft === "F" || charLeft === "L") {
        startingTravel.left = true;
    };

    if (charRight === "-" || charRight === "7" || charRight === "J") {
        startingTravel.right = true;
    };

    if (charAbove === "|" || charAbove === "F" || charAbove === "7") {
        startingTravel.up = true;
    };

    if (charBelow === "|" || charBelow === "L" || charBelow === "J") {
        startingTravel.down = true;
    };
        
    let stepCounter = 0;
    let newCharacter = "";
   
    while (newCharacter !== "S") { // Loop till you find the start point again.

        //Choose an initial travel direction from "S".
        if (stepCounter === 0) {

            if (startingTravel.left){  
            initialTravel = "left";
            travelDirection = "left";
            currentIndex -= 1;
            stepCounter ++;
            } else if (startingTravel.right) {
            initialTravel = "right";
            travelDirection = "right";
            currentIndex += 1;
            stepCounter ++;
            } else if (startingTravel.down) {
            initialTravel = "down";
            travelDirection = "down";
            currentLine += 1;
            stepCounter ++;
            } else if (startingTravel.up) {
            initialTravel = "up";
            travelDirection = "up";
            currentLine -=1;
            stepCounter ++;
            };

            let initialPipe = pipeGrid[startingLine];
            if (startingTravel.up) { //Update the starting point as a P if it is used as a north facing barrier.
                newInitialPipe = lineUpdate(initialPipe, startingIndex, "P");
            } else {
                newInitialPipe = lineUpdate(initialPipe, startingIndex, "*");
            };
            pipeGrid[startingLine] = newInitialPipe;
        };

        let currentChar = gridData[currentLine].charAt(currentIndex);
        let travelOptions = {left: false, down: false, right: false, up: false};

        let currentPipes = pipeGrid[currentLine];
        let newPipes = "";
        if (currentChar === "L" || currentChar === "J" || currentChar === "|") { //Only count north facing pipes as barriers.
            newPipes = lineUpdate(currentPipes, currentIndex, "P");
        } else { 
            newPipes = lineUpdate(currentPipes, currentIndex, "*");
        };
        pipeGrid[currentLine] = newPipes;

        //Determine where you move, depending on your direction and which character you encounter.
        if (currentChar === "L" && travelDirection === "left") {
            travelOptions.up = true;
        } else if (currentChar === "L" && travelDirection === "down") {
            travelOptions.right = true;
        } else if (currentChar === "J" && travelDirection === "right") {
            travelOptions.up = true; 
        } else if (currentChar === "J" && travelDirection === "down") {
            travelOptions.left = true;
        } else if (currentChar === "7" && travelDirection === "right") {
            travelOptions.down = true; 
        } else if (currentChar === "7" && travelDirection === "up") {
            travelOptions.left = true;
        } else if (currentChar === "F" && travelDirection === "left") {
            travelOptions.down = true; 
        } else if (currentChar === "F" && travelDirection === "up") {
            travelOptions.right = true; 
        } else if (currentChar === "|" && travelDirection === "down") {
            travelOptions.down = true;
        } else if (currentChar === "|" && travelDirection === "up") {
            travelOptions.up = true;
        } else if (currentChar === "-" && travelDirection === "right") {
            travelOptions.right = true;
        } else if (currentChar === "-" && travelDirection === "left") {
            travelOptions.left = true;
        } else { //If the route is a dead end, go back to the start.
            stepCounter = 0;
            currentLine = startingLine;
            currentIndex = startingIndex;
            pipeGrid = JSON.parse(JSON.stringify(emptyGrid)); //Reset the pipeGrid back to the empty grid.

            if (initialTravel = "left") { //Remove the initially chosen path as a starting possibilities.
                startingTravel.left = false;
            } else if (initialTravel = "right") {
                startingTravel.right = false;
            } else if (initialTravel = "down") {
                startingTravel.down = false;
            } else if (initialTravel = "up") {
                startingTravel.up = false;
            };
        };

        //Move to the next character and adjust variables.
        if (travelOptions.left) {
            travelDirection = "left";
            currentIndex -= 1;
            stepCounter++;
            newCharacter = gridData[currentLine].charAt(currentIndex);
        } else if (travelOptions.right) {
            travelDirection = "right";
            currentIndex += 1;
            stepCounter++;
            newCharacter = gridData[currentLine].charAt(currentIndex);
        } else if (travelOptions.down) {
           travelDirection = "down";
            currentLine += 1;
            stepCounter++;
            newCharacter = gridData[currentLine].charAt(currentIndex);
        } else if (travelOptions.up) {
            travelDirection = "up";
            currentLine -= 1;
            stepCounter++;
            newCharacter = gridData[currentLine].charAt(currentIndex);
        };
    };

    let areaCounter = 0;

    //For each line check if a tile is within pipes or not.
    pipeGrid.forEach(line => {
        let withinPipe = false;

        for (let i=0; i<line.length; i++) { //Loop over all characters in the line.
            if (line.charAt(i) === ".") { 
                if (withinPipe) { //If the character is within the pipes, count it.
                    areaCounter++;
                }
            } else if (line.charAt(i) === "P") { //If char in grid is a P, flip the withinPipe variable.
                if (withinPipe) {
                    withinPipe = false;
                } else {
                    withinPipe = true;
                };
            };
        };
    });

    console.log("Area's within pipes: " + areaCounter);
});

function lineUpdate(string, index, replacement) {
    let updatedLine = string.split(""); //Transform the string into an array.
    updatedLine.splice(index, 1, replacement); //Splice the array to update a specific character.
    updatedLine = updatedLine.join(""); //Turn the array back into a string.
    return updatedLine;
};