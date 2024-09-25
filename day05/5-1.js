const fs = require("fs");
 
fs.readFile("day5/input 5.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };
   
    const arr = data.split(/\s{3,}/gm); //Sort the data and create your data arrays.
    const seedNumbers = arr[0].split(/\:\s+/)[1].split(/\s+/);
    const mapInfo = arr.slice(1,);
    let mapData = [];
    let lowestNumber = Infinity;

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

    seedNumbers.forEach (seed => { //Loop over each seed.
        inputNumber = +(seed);

        for (i=0; i < mapData.length; i++) { //Loop over each map to perform all the different mappings.

            for (x=0; x<mapData[i].length; x++){ // Loop the possible ranges in the map to find which one applies to the given input number.
                minSource = mapData[i][x].sourceRange;
                maxSource = mapData[i][x].sourceRange + mapData[i][x].length;
                destinationDiff = mapData[i][x].destinationRange - minSource;
                
                if (inputNumber >= minSource && inputNumber < maxSource) {
                    inputNumber += destinationDiff;
                    break;  
                };
            };
        };

        if (inputNumber < lowestNumber) {
            lowestNumber = inputNumber;
        };
    });

   console.log("Lowest location number: " + lowestNumber);
});