require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const userRouter = require('./routes/user.route');
const messageRouter = require('./routes/message.route');

connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/msg', messageRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});