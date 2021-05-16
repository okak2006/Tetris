const config = require('config')
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
// Registration Route
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Invalid email')
        .isEmail(),
    check('password', 'Your password must be at least 8 characters, contain special characters, and have lower and upper case alphabet')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
], async (req, res) => {
    //returns an object containing matching errors
    const errors = validationResult(req); 
    
    if(!errors.isEmpty()){
        // errors.array() => [{ msg: "message" }]
        // To-Do: use TS, throw JS Errors, and use express middleware to ensure error response comes in specified format
        return res.status(400).json({ errors: errors.array() });
    };

    const { name, email, password } = req.body; 

    try {
        //returns promise
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ errors: [{ msg: "User already Exists" }] })
        }

        //create user
        user = new User({
            name,
            email,
            password
        })

        //encrypt password using Bcrypt. genSalt returns promise. Salt is a random string that makes hash unpredictable
        const salt = await bcrypt.genSalt(10)
        user.password = await brcypt.hash(password, salt)

        //save user to the database
        await user.save();

        //once user credentials are validated, the server sends back a signed token to the browser
        //afterwards, each request coming from the browser will come along with the token
        //app server checks JWT to identify the person. 
        //App knows the request is coming from user because a token is only signed after successful login validation
        const payload = {
            user: { id: user.id }
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

    } catch (err) {
        console.error(err);
    }
})

module.exports = router;