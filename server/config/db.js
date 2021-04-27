const mongoose = require('mongoose');
const config = require('config');

const db = config.get("mongoURI");

const DB = async () => {
    try {
        await mongoose.connect(db, {
          useNewUrlParser: true, 
          useUnifiedTopology: true  
        });
        console.log('connected to database');
    } catch (error) {
        console.error(error);
    };
}

module.exports = DB;