const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

var fs = require('fs');

//for file upload
var multer = require('multer')


const db = require('./config/db');
const app = express();
const port = 8080;

// set the static files location - public folder
app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})





/*
app.post('/upload', upload.single('file'), function(req, res, next) {
    // req.file - field name of this file "file"
    console.log(req.file);
    // req.body will hold the text fields, if there were any
    res.status(204).end()
})
*/

var upload = multer({ dest: './files/upload' }).single('file');

app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
            //return
            console.log('Error' + err);
            res.status(400).end();
        }
        // Everything went fine
        // req.file - field name of this file "file"
        console.log(req.file);
        res.status(200).end();
    })
})