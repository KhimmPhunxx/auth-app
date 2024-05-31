const express = require('express');
const mongoose = require('mongoose');
const core = require('cors');
const authRoute = require('./routes/authRoute');

const app = express();

// 1- MIDLEWARE
app.use(core());
app.use(express.json());

// 2- ROUTES
app.use('/api/auth', authRoute);

// 3- MongoDB Db connection
mongoose
    .connect('mongodb://127.0.0.1:27017/authentication')
    .then(() => console.log('Connected to MongoDB!'))
        .catch(err => console.error('Could not connect to MongoDB', err)
    );

// 4- Global Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// 5- Start Server
const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
}); 