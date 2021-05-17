const config = require('config')
const express = require('express');
const Score = require('../models/Score');
const auth = require('../middleware/auth');
const { db } = require('../models/Score');

const router = express.Router();

//@route  POST api/scores
//@desc   store the user's score after a game
//@access protected

router.post('/', auth, async (req, res) => {
  
  const { score } = req.body; 
  const userId = req.user.id;
  try {
    //for mongoose, use .create({}) for when adding 1 document, insertMany for multiple documents;
    //the insert() or insertOne() method from MongoDB may not work("not a function...")
    await Score.create({
      "score": score,
      "user_id": userId
    });

    res.send("Score successfully added to database");
      
  } catch (error) {
     console.error(error.message);
     res.status(500).send('Server error');
  }
})

module.exports = router;