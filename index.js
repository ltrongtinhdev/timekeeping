const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

// các route

//GET
app.get('', (req, res) => {
    res.send('Hello Nodejs app')
})

require('./app/routes/employee')(app);
require('./app/routes/timekeeping')(app);

// mở cổng server
app.listen(port, async () => {
    console.log(`Server is running in port ${port}`);
})