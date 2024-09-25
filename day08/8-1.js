const fs = require("fs");
 
fs.readFile("day8/input 8.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\s{3,}/);
    const steps = arr[0];
    const nodeData = arr[1].split(/\r\n/);
    let network = [];

    nodeData.forEach (node => { //Loop over all nodes to fill the network array.
        start = node.split(/\s[\=]\s/)[0];
        options = node.split(/\s[\=]\s/)[1].replace("(", "").replace(")", "");
        left = options.split(/,\s/)[0];
        right = options.split(/,\s/)[1];
        network.push({start: start, left: left, right: right});
    });

    let location = "AAA";
    let stepCounter = 0, characterCounter = 0;

    while (location !== "ZZZ") { //Loop till you reach location "ZZZ"
        index = network.findIndex(x => x.start === location); //Find the index of the network where the current location matches.
        
        if (steps.charAt(characterCounter) === "L") { //Pick the next location based on whether the corresponding step is "L" or "R".
            location = network[index].left;
        } else if (steps.charAt(characterCounter) === "R") {
            location = network[index].right;
        };
        
        stepCounter++; //Update counters.
        characterCounter++;

        if (characterCounter === steps.length) { //If you have used all the steps in the list, repeat the list.
            characterCounter = 0;
        };
    };

    console.log(stepCounter);
});