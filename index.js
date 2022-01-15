const express = require('express');
const cors = require('cors');
const {check, validationResult} = require('express-validator');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json({ extended: false }));
app.use(express.static('public'));

app.use('/api/email', require('./routes/Email'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server started...')
});