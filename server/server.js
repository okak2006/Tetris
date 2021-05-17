const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db')

// Import route files
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth')
const scoreRoute = require('./routes/score');

const app = express(); 
app.use(express.json(), cors())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
    console.log('listening on 5000')
});

// Setup Route
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/scores', scoreRoute);

connectDB();