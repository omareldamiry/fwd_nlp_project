const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var path = require('path');

const port = 8081;

dotenv.config();
const url = process.env.API_URL;

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res, next) => {
    console.log(url);
    res.send(process.env.API_KEY);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;