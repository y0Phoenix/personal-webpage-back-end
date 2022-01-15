const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

router.post('/', [
    check('emailFrom', 'Please Enter A Valid Email').isEmail(),
    check('text', 'Text is required').exists(),
    check('subject', 'Please Enter a subject tag').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {fromData, text, subject} = req.body;

    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: false,
            service: 'Gmail',
            auth: {
                user: 'aarongraybill3@gmail.com',
                pass: 'xzbitnriwxdnhycf',
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: fromData, // sender address
            to: 'aarongraybill3@gmail.com', // list of receivers
            subject: subject, // Subject line
            text: `From ${fromData}\n\n${text}`, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.json({msg: `Email sent successfully from ${fromData}`});
                
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;