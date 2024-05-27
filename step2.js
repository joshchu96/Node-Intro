let fs = require('fs');
const process = require('process');
const axios = require('axios');

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

cat(process.argv[2]);

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response);
    } 
    catch(error) {
        console.error(`Error fetching: ${url}: ${error}`);
        process.exit(1);
    }
};

let path = process.argv[2];

if(path.includes('https')) {
    webCat(path);
} else {
    cat(path);
}
