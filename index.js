const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = require("node-fetch");
const app = express();
const dbDir = './db/gifs.json';

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

fetch('')
    .then(res => {
        if (res.status >= 400) {
        throw new Error("Bad response from server");
        }
        return res.json();
    })
    .then(res => res.data)
    .then(data => {
        const dataArr = [];
        data.forEach(element => {
            dataArr.push(element.images.downsized_large.url);
        });
        return dataArr;
    })
    .then(data => {
        fs.writeFileSync(dbDir, JSON.stringify(data, null, 2));
    })
    .catch(err => console.log('Error', err.message));
    


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/get-cards', (req,res) => {
    let urls = JSON.parse(fs.readFileSync(dbDir, err => console.log(err)));
    urls = urls.concat(urls);
    const sendData = shuffleArray(urls);
    res.send(sendData);
    console.log('Data Sent');
});

// Handles any requests that don't match the ones above
app.post('/api/leader-board', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
