const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

const {
    check,
    validationResult
} = require('express-validator');


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private 
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
            .populate('user', ['name', 'avatar'])
            .populate('followers', ['name']).exec();

        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile for this user'
            })
        } else {
            res.json(profile);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    create/update a user profile
// @access  Private 
router.post('/', [auth, 
],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {
            bio,
            location,

            youtube,
            twitter,
            facebook,
            instagram
        } = req.body;


        const profileFields = {};

        profileFields.user = req.user.id;
        
        if (bio) {
            profileFields.bio = bio;
        }
        if (location) {
            profileFields.location = location;
        }

        if (youtube) {
            profileFields.youtube = youtube;
        }
        if (twitter) {
            profileFields.twitter = twitter;
        }
        if (facebook) {
            profileFields.facebook = facebook;
        }
        if (instagram) {
            profileFields.instagram = instagram;
        }

        try {
            let profile = await Profile.findOne({
                user: req.user.id
            });
            if (profile) {
                profile = await Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                })
                return res.json(profile)
            }
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    },
);

// @route   POST api/profile/follow
// @desc    current user follow userId
// @access  Private 
router.post('/follow', [auth, 
],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const follower = req.body.follower;
        const followee = req.body.followee;

        try {
            let profile = await Profile.findOne({
                user: follower
            });

            if (profile) {
                profile = await Profile.findOneAndUpdate({
                    user: followee
                }, {
                    $addToSet: 
                    {
                        followers: follower
                    }
                }, {
                    new: true
                })
                return res.json(profile)
            }

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    },
);

// @route   POST api/profile/unfollow
// @desc    current user follow userId
// @access  Private 
router.post('/unfollow', [auth, 
],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const follower = req.body.follower;
        const followee = req.body.followee;

        try {
            let profile = await Profile.findOne({
                user: follower
            });

            if (profile) {
                profile = await Profile.findOneAndUpdate({
                    user: followee
                }, {
                    $pull: 
                    {
                        followers: follower
                    }
                }, {
                    new: true
                })
                return res.json(profile)
            }

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    },
);


// @route   POST api/profile/artist/:artistId
// @desc    update a user's favorite artist
// @access  Private 
router.post('/artist/:artistId', [auth, 
],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }


        const artist = req.body['artist']
        const artistId = req.params.artistId


        try {
            let profile = await Profile.findOne({
                user: req.body.id
            });
            if (profile) {
                profile = await Profile.findOneAndUpdate({
                    user: req.body.id
                }, {
                    $addToSet: 
                    {
                        favouriteartistsId: artistId,
                        favouriteartists: artist
                    }
                }, {
                    new: true
                })
                return res.json(profile)
            }
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    },
);

// @route   POST api/profile/song/:songId
// @desc    update a user's favorite artist
// @access  Private 
router.post('/song/:songId', [auth, 
],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const song = req.body['song']
        const songId = req.params.songId


        try {
            let profile = await Profile.findOne({
                user: req.body.id
            });
            if (profile) {
                profile = await Profile.findOneAndUpdate({
                    user: req.body.id
                }, {
                    $addToSet: 
                    {
                        favouritesongsId: songId,
                        favouritesongs: song
                    }
                }, {
                    new: true
                })
                return res.json(profile)
            }
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    },
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find()
            .populate('user', ['name', 'avatar', 'date'])
            .populate('followers', ['name']).exec();
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/artist/:artistId
// @desc    Get all profiles
// @access  Public
router.get('/artist/:artistId', async(req, res) => {
    try {
        const profiles = await Profile.find({
            favouriteartistsId: req.params.artistId
        },{user: 1}).populate('user', ['name', 'avatar'])
        .populate('followers', ['name']).exec();
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/song/:songId
// @desc    Get all profiles
// @access  Public
router.get('/song/:songId', async(req, res) => {
    try {
        const profiles = await Profile.find({
            favouritesongsId: req.params.songId
        },{user: 1}).populate('user', ['name', 'avatar'])
        .populate('followers', ['name']).exec();
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:uid', async(req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.uid
        }).populate('user', ['name', 'avatar', 'roleType'])
        .populate('followers', ['name']).exec();

        if (!profile) return res.status(400).json({
            msg: 'Profile not found'
        });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'Profile not found'
            });
        }
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/profile
// @desc     Delete profile, user and posts
// @access   Private
router.delete('/', auth, async(req, res) => {
    try {
        // TODO: Remove all posts of a user
        // await Post.deleteMany({ user: req.user.id });

        // Remove profile
        if (await Profile.findOne({
                user: req.user.id
            })) {
            await Profile.findOneAndRemove({
                user: req.user.id
            });
            // Remove user
            await User.findOneAndRemove({
                _id: req.user.id
            });
            res.json({
                msg: 'User deleted'
            });
        } else {
            res.json({
                msg: 'Failed to delete, no such user'
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;