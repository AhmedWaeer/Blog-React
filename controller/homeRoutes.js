/* eslint-disable prettier/prettier */
const router = require('express').Router();
const { User, Post, Comment } = require('../models');



router.get('/', async(req, res) => {
    try {
        const posts = await Post.find({}).populate("createdBy").lean();
        res.json( posts );
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async(req, res) => {
    try {
        if (req.session.user && req.cookies.user_sid) {
            console.log(req.session.user._id);
            const user = await User.find({ _id: req.session.user._id }).populate("posts").lean();
            console.log(user);
            const posts = user[0].posts;
            res.json({ posts});
        } else {
            res.redirect('/login');
        }
    } catch (err) {

        res.status(500).json({ message: "Please login first!" });
    }
});

router.get('/post/:id', async(req, res) => {
    try {
        const requiredPost = await Post.find({ _id: req.params.id }).deepPopulate('comments, comments.createdBy').lean();
        console.log(requiredPost);
        const post = requiredPost[0];
        console.log(post);
        res.json(post);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
        return;
    }
    res.json('login');
});

router.get('/signup', (req, res) => {

    res.json('signup');
});

module.exports = router;
