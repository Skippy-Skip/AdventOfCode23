const fs = require("fs");
 
fs.readFile("day6/input 6.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    const time = arr[0].split(/\:\s+/)[1].replace(/\s+/g, "");
    const distance = arr[1].split(/\:\s+/)[1].replace(/\s+/g, "");
    let counter = 0;

    for (i=1; i<time; i++) {   //i=0 and i=time, the total traveled distance = 0, so exclude these.

        if (i * (time - i) > distance) { //Count the amount of ways to win
            counter++;
        };
    };

    console.log("Amount of ways to beat the record: " + counter);
});