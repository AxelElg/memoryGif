const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

const Http = new XMLHttpRequest();
const url=' .';
Http.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
    console.log(Http.responseText);
}
Http.open("GET", url, true);
Http.send(null);


if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    // var list = ["item1", "item2", "item3"];
    res.send('hello world');
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
