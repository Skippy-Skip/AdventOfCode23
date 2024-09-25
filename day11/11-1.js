const fs = require("fs");
 
fs.readFile("day11/input 11.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/); 
    const columnAmount = arr[0].length;
    const foundGalaxies = [];
    const emptyColumns = [];

    for (let i=0; i<columnAmount; i++) { //Create an array of each column value.
        emptyColumns.push(i);
    };

    let lineCounter = 0;

    arr.forEach (line => {

        if (line.replaceAll(".", "").length === 0) { //Empty line, add 1 to the lineCounter, to simulate an extra empty line.
            lineCounter++; 
        } else { 

            while  (line.replaceAll(".","").length > 0) { //If a galaxy is found on the line.
                galaxyIndex = line.indexOf("#"); 

                if (emptyColumns.includes(galaxyIndex)) { //Remove the found index from the emptyColumns array.
                    emptyColumns.splice(emptyColumns.indexOf(galaxyIndex), 1);
                };

                foundGalaxies.push({line: lineCounter, index: galaxyIndex}); 
                line = line.split(""); //Remove the found galaxy from the line, and repeat if more galaxies are found.
                line.splice(galaxyIndex, 1 , ".");
                line = line.join("");
            };
        };

        lineCounter++;
    });
    
    let expandedColumns = 0;

    emptyColumns.forEach(column => { //Adjust the found index location based on the amount of empty columns, to simulate an extra empty column.

        foundGalaxies.forEach(galaxy => {

            if (galaxy.index > column + expandedColumns) {
                galaxy.index++;
            };
        });

        expandedColumns++; //Adjust the original column numbers after the expansion. 
    });
   
    let galaxyCounter = 0;
    let differenceLine = 0, differenceIndex = 0, shortestDistance = 0;
    let sumTotal = 0;

    foundGalaxies.forEach(galaxy => {

        for (let i=(galaxyCounter+1); i<foundGalaxies.length; i++) {
            differenceLine = Math.abs(galaxy.line - foundGalaxies[i].line);
            differenceIndex = Math.abs(galaxy.index - foundGalaxies[i].index);
            shortestDistance = differenceLine + differenceIndex;
            sumTotal += shortestDistance;
        };

        galaxyCounter++;
    });

    console.log("Sum of distances: " + sumTotal);
});