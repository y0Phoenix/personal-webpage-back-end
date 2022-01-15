const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3000, () => {
    console.log('server started...')
});