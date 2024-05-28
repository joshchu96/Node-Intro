let fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path,output) {
    fs.readFile(path,'utf-8', function(err,data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1); //end the code due to an error.
        } else {
            handleOutput(data,output);
        }

    });
}

cat(process.argv[2]);

async function webCat(url,output) {
    try {
        let response = await axios.get(url);
        handleOutput(response.data,output);
    } 
    catch(error) {
        console.error(`Error fetching: ${url}: ${error}`);
        process.exit(1);
    }
};


function handleOutput(data,output) {
    if(output) {
        fs.writeFile(output,data,'utf-8',function(err) {
            if (err) {
                console.error("Couldn't write ${output}:${err}");
                process.exit(1);
            }
        });
    }
    else {
            console.log(data);
    }
}

let path = process.argv[2];

if(path.includes('https')) {
    webCat(path);
} else {
    cat(path);
}

if (process.argv[2] === '--out') {
    output = process.argv[3];
    path = process.argv[4];
}
else {
    path = process.argv[2];
}

