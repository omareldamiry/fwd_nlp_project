const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
var path = require('path');
var https = require('follow-redirects').https;
const { Chunk } = require('webpack');

const port = 8081;

dotenv.config();
const url = process.env.API_URL;

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => {
    console.log(url);
    res.sendFile('dist/index.html');
});

app.post('/add-url', (req, res) => {
    try{
        var articleUrl = req.body.url;
        var query = `/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${articleUrl}`;
        var options = {
            'method': 'POST',
            'hostname': url,
            'path': query,
            'headers': {

            },
            'maxRedirects': 20
        };
        var result;

        var request = https.request(options, (res) => {
            var chunks = [];

            res.on("data", chunk => {
                chunks.push(chunk);
            });

            res.on("end", chunk => {
                var body = Buffer.concat(chunks);
                result = body.toString();
                console.log(result);
            });

            res.on("error", err => {
                console.log(err);
            });
        });

        request.end((res) => {
            res.status(200).send({
                message: result
            });
        });

        res.status(200).send({
            message: result
        });
    } catch (err) {
        throw err;
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