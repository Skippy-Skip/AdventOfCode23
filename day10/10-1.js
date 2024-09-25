const fs = require("fs");
 
fs.readFile("day10/input 10.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/); 
    let gridData = [];
    let lineCounter = 0;
    let startingLine = 0, startingIndex = 0;

    arr.forEach (line => {  //Get the pipe layout, and find the starting point.
       
        if (line.includes("S")) {
            startingLine = lineCounter;
            startingIndex = line.indexOf("S");
        };

        gridData.push(line);
        lineCounter++;
    });
   
    const lastLine = (lineCounter -1); //Last line of the input.
    const lastIndex = gridData[0].length; //Width of the grid.
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

    //From the start point, determine the amount of suitable adjacent pipes to see where travel is possible.
    let startingTravel = {left: false, below: false, right: false, above: false};

    if (charLeft === "-" || charLeft === "F" || charLeft === "L") {
        startingTravel.left = true;
    };

    if (charRight === "-" || charRight === "7" || charRight === "J") {
        startingTravel.right = true;
    };

    if (charAbove === "|" || charAbove === "F" || charAbove === "7") {
        startingTravel.above = true;
    };

    if (charBelow === "|" || charBelow === "L" || charBelow === "J") {
        startingTravel.below = true;
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
        };

        let currentChar = gridData[currentLine].charAt(currentIndex);      
        let travelOptions = {left: false, down: false, right: false, up: false};

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
    console.log("Amount of steps: " + (stepCounter / 2));
});