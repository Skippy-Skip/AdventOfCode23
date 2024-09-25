const fs = require("fs");
 
fs.readFile("day5/input 5.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };
   
    const arr = data.split(/\s{3,}/gm); //Sort the data and create your data arrays.
    const seedNumbers = arr[0].split(/\:\s+/)[1].split(/\s+/);
    const mapInfo = arr.slice(1,);
    let mapData = [], seedPairs = [];
    let lowestNumber = Infinity;

    for (i=0; i<seedNumbers.length; i+=2) { //Match all the seed pairs.
        seedPairs.push({start: seedNumbers[i], range: seedNumbers[i+1]});
    }

    mapInfo.forEach (map => { //Loop over each map array to get the required data.
        rangeInfo = map.split(/\r\n/).slice(1,);
        rangeData = []; //Create an array per map, to differentiate between the maps.
        rangeInfo.forEach (set => {
            values = set.split(/\s+/);
            rangeData.push({
                destinationRange: +(values[0]),
                sourceRange: +(values[1]),
                length: +(values[2])
            });
        });
        mapData.push(rangeData);
    });

    seedPairs.forEach (seed => {
        
        for (i=0; i < seed.range; i++) {
        inputNumber = +(seed.start) + i;

            for (x=0; x < mapData.length; x++) { //Loop over each map to perform all the different mappings.
                
                for (y=0; y<mapData[x].length; y++){ // Loop the possible ranges in the map to find which one applies to the given input number.
                    minSource = mapData[x][y].sourceRange;
                    maxSource = mapData[x][y].sourceRange + mapData[x][y].length;
                    destinationDiff = mapData[x][y].destinationRange - minSource;
                    
                    if (inputNumber >= minSource && inputNumber < maxSource) {
                        inputNumber += destinationDiff;
                        break;  
                    };
                };
            };

            if (inputNumber < lowestNumber) {
                lowestNumber = inputNumber;
            };
        };
    
    console.log ("yay one seed pair is done");
    console.log ("non final lowest number: " + lowestNumber);
    });

   console.log("DONE! Lowest location number is: " + lowestNumber);
});