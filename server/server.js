const cors = require('cors');
const express = require('express');
const { readdirSync } = require('fs');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    console.log("Middleware called");
    next();
});
app.get('/', (req, res) => {
    res.status(200).json({ message: `Welcome to User Authentication System` })
});

// Routes
app.post('/register', (req, res, next) => {
    res(require('./routes/userRoute'));
});
app.post('/login', (req, res) => {
    res(require('/routes/userRoute'));
});

const port = process.env.PORT || 1700;
app.listen(port, () => {
    console.log(
        `Server running on Port ${port} __96 INVERTED`
    )
});