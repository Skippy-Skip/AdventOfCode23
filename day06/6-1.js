const fs = require("fs");
 
fs.readFile("day6/input 6.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\r\n/);
    const time = arr[0].split(/\:\s+/)[1].split(/\s+/);
    const distance = arr[1].split(/\:\s+/)[1].split(/\s+/);
    let races = [];
    let counter = 0, sumTotal = 1;

    for (i=0; i< time.length; i++) { //Create an array with the data of each race
        races.push({time: time[i], distance: distance[i]});
    };

    races.forEach (race => {

        for (i=1; i<race.time; i++) {   //i=0 and i=race.time, the total traveled distance = 0, so exclude these.

            if (i * (race.time - i) > race.distance) { //Count the amount of ways to win
                counter++;
            };
        };

        sumTotal *= counter; //Store and reset variables.
        counter = 0;
    });

    console.log("Total value is: " + sumTotal);
});