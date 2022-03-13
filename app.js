const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');

const app = express();
const port = 5000;

// const VIEWS = path.join(__dirname, 'views');

app.use(cookieParser());
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})