const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
var path = require('path');
var https = require('follow-redirects').https;
var fs = require('fs');
const { Chunk } = require('webpack');

const port = 8081;

dotenv.config();
const url = 'api.meaningcloud.com';

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

app.post('/add-url', (req, res) => {
    try{
        var articleUrl = req.body.url;
        var options = {
            'method': 'POST',
            'hostname': url,
            'path': `/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${articleUrl}`,
            'headers': {

            },
            'maxRedirects': 20
        };
        
        var request = https.request(options, (response) => {
            var chunks = [];

            response.on("data", chunk => {
                chunks.push(chunk);
            });

            response.on("end", (chunk) => {
                var body = Buffer.concat(chunks);

                res.send({
                    result: body.toString()
                });
            });

            response.on("error", err => {
                console.log(err);
            });
        });

        request.end();

        // res.send({
        //     message: result
        // });
    } catch (err) {
        console.log("Error here, hjelp!");
    }
    
});

app.get('/test', (req, res) => {
    res.send({
        message: 'This is a message!'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
