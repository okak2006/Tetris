const express = require('express');
const { check, validationResult } = require('express-validator/check');
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
    const errors = validationResult(req); //returns an object
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    };

    const { name, email, password } = req.body; 

    try {
        
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;