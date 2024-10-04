require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});