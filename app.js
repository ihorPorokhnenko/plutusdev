const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
module.exports = app;

//basic server to serve production app