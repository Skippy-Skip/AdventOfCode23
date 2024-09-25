const fs = require("fs");
 
fs.readFile("day13/input 13.txt", "utf8", (err, data) => {
    if(err){
        console.error(err);
        return;
    };

    const arr = data.split(/\s{3,}/);
   
    let sumTotal = 0;

    arr.forEach (pattern => {
        rows = pattern.split(/\r\n/);
        
        let rowCounter = 1;
        let columnMirrors = fillColumnArray(rows[0]);

        rows.forEach(row => { 

            let rowMirror = checkRowMirror(rowCounter, rows); //Check if the current row has a "mirror".

            if (rowMirror) { //If it does, add the value * 100 to the total sum.
                sumTotal += (rowCounter * 100);
            };

            for (let i=0; i<columnMirrors.length; i++) { //For all the columns which can possibly be a "mirror", check this.
                possibleColumnMirror = checkColumnMirror(columnMirrors[i], row);
                if (!possibleColumnMirror) { //If the column is NOT a mirror, remove the column for the array.
                    columnMirrors.splice(i,1);
                    i--
                };
            };

            rowCounter++;
        });
        
        if (columnMirrors.length > 0) { //Add the value for the column mirrors to the total.
            columnMirrors.forEach(column => {
                sumTotal += column;
            });
        };
    });

    console.log("Total sum is: " + sumTotal)
});

function fillColumnArray(string) {  //Fill an array for each column number (except the last column since this can't be a "mirror").
    let len = string.length;
    let array = [];

    for (i=1; i<len; i++) {
        array.push(i);
    };

    return array;
};

function checkRowMirror(n, array) { //Check if the row mirrors across the rows.
    let possibleMirror = true;
    let len = array.length;
    let loops = Math.min(n, (len-n));
    
    if (loops === 0) { //If there are no loops, you are at the end row, this can not be a mirror.
        possibleMirror = false;
        return possibleMirror;
    };

    for (let i=0; i<loops; i++) { 
        if (array[n-1-i] !== array[n+i]) {
            possibleMirror = false;
            return possibleMirror;
        };
    };

    return possibleMirror;
};

function checkColumnMirror(n, string) { //Check if the column mirrors across the string.
    let possibleMirror = true;
    let len = string.length;
    let loops = Math.min(n, (len-n));

    for (let i=0; i<loops; i++) {
        if (string.charAt(n-1-i) !== string.charAt(n+i)) {
            possibleMirror = false;
            return possibleMirror;
        };
    };
    
    return possibleMirror;
};

