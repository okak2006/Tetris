const config = require('config')
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//@route  GET api/auth
//@desc   GET user information from JWT token
//@access Public
//route   protected through auth middlware
//To-do don't forget to import auth mw
route.get('/', auth, async (req, res) => {
    try {
        //auth mw sets req.user after jwt is decdoed. We don't want to send back the user password to frontend
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
}) 

//@route  POST api/auth
//@desc   Login user and sign jwt
//@access Public

router.post('/', [
    check('email', 'Invalid email')
        .isEmail(),
    check('password')
        .exists()
], async (req, res) => {
    const errors = validationResult(req); 
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    };

    const { email, password } = req.body; 
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [ {msg: 'User does not exist or there is no matching credentials'} ]});
        };

        const isMatch = await brycpt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [ {msg: 'User does not exist or there is no matching credentials'} ]});
        }

        const payload = {
            user: {id: user.id}
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({ token })
            }
        );
        
    } catch (error) {
       console.error(error.message);
       res.status(500).send('Server error');
    }
})

module.exports = router;