const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db')

// Import route files
const userRoute = require('./routes/user')

const app = express(); 
app.use(express.json(), cors())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
    console.log('listening on 5000')
});

// Setup Routes
app.use(userRoute)

connectDB();