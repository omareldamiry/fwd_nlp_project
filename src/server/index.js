const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

const port = 8080;

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json({ extended: true }));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;