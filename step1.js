let fs = require('fs');
const process = require('process')

function cat(path) {
    fs.readFile(path,'utf-8', function(err,data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1); //end the code due to an error.
        } else {
            console.log(data);
        }

    });
}

console.log(process.argv[0]);
console.log(process.argv[1]);
console.log(process.argv[2]);
cat(process.argv[2]);

//run in terminal: node step1.js one.txt