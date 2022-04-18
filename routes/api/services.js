const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
    '/', [
        auth, [
            check('description', 'desription is required')
            .not()
            .isEmpty(),
            check('location', 'location is required').exists(),
            check('serviceType', 'Please select a role type').exists(),
            check('detail', 'please fill in the details').exists(),

        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newService = new Service({
                description:req.body.description,
                detail: req.body.detail,
                serviceType:req.body.serviceType,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const service = await newPost.save();

            res.json(service);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);



module.exports = router;