const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/email', require('./routes/Email'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server started...')
});