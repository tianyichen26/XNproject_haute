const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../../models/User');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// @route   POST api/users
// @desc    Register a new user
// @access  Public 
router.post('/', [
    check('name', 'Name is required').exists(),
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    }),
    check('roleType', 'Please select a role type').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        roleType,
        name,
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        // Check if the user already exists
        if (user) {
            res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            });
        }

        // Get the user's avatar using email
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            roleType,
            name,
            email,
            avatar,
            password
        })

        profile = new Profile({
            user,
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        await profile.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

// @route   POST api/users/:userId
// @desc    Update an existing new user
// @access  Public 
router.post('/:userId', [
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const id = req.params['userId']
    try {
        let user = await User.findOne({
            _id: id
        });

        if (user) {

            user = await User.findOneAndUpdate({
                _id: id
            }, {
                $set: req.body
            }, {
                new: true
            })

            return res.json(user)
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

});

module.exports = router;