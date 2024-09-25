const fs = require("fs");
 
fs.readFile("day8/input 8.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\s{3,}/);
    const steps = arr[0];
    const nodeData = arr[1].split(/\r\n/);
    let network = [], startingPoints = [], stepsPerPoint = [];


    nodeData.forEach (node => { //Loop over all nodes to fill the network array.
        start = node.split(/\s[\=]\s/)[0];
        options = node.split(/\s[\=]\s/)[1].replace("(", "").replace(")", "");
        left = options.split(/,\s/)[0];
        right = options.split(/,\s/)[1];
        network.push({start: start, left: left, right: right});
    });

    network.forEach(node => { //Loop over all nodes to find all starting points ending on "A".

        if (node.start.charAt(node.start.length-1) === "A") {
            startingPoints.push(node.start);
        };
    });

   
    startingPoints.forEach(startLocation => { //For each starting point find the amount of steps it takes to get to a point ending on "Z".
        let stepCounter = 0, characterCounter = 0;
        let location = startLocation;
       
        while (location.charAt(location.length-1) !== "Z") {
            foundIndex = network.findIndex(x => x.start === location); //Find the index of the network where the current location matches.
            
            if (steps.charAt(characterCounter) === "L") { //Pick the next location based on whether the corresponding step is "L" or "R".
                location = network[foundIndex].left;
            } else if (steps.charAt(characterCounter) === "R") {
                location = network[foundIndex].right;
            };
            
            stepCounter++; //Update counters.
            characterCounter++;

            if (characterCounter === steps.length) { //If you have used all the steps in the list, repeat the list.
                characterCounter = 0;
            };
        };

        stepsPerPoint.push(stepCounter); //Push the steps per counter in a seperate array.
    });

    console.log("Steps per location ending on 'A': " + stepsPerPoint);

    while (stepsPerPoint.length > 1) { //Loop till you have 1 item left in the array, which is the final "Least Common Multiple" (LCM). 
        lcm = lcmCalculator(stepsPerPoint[0],stepsPerPoint[1]); //Calculate the LCM of the first 2 numbers in the array.
        stepsPerPoint.splice(0,2); //Remove these numbers from the array.
        stepsPerPoint.push(lcm); //Add the new LCM in the array.
    };

    console.log("LCM of all found steps: " + stepsPerPoint);

    function lcmCalculator(n1, n2) { //Function to calculate LCM.

        let largest = Math.max(n1,n2) ;
        let smallest = Math.min(n1,n2);
        
        let i = largest;

        while (i % smallest !== 0) { //Loop till the smallest value is perfectly divisible by i.
            i += largest; 
        }
        
        return i; //This is the found LCM.
    };
});