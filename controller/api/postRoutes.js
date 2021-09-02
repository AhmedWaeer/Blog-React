/* eslint-disable prettier/prettier */
const router = require('express').Router();
const { Post, User } = require('../../models');



router.post('/new', async(req, res) => {
    try {
        if (req.session.loggedIn && req.session.user) {
            const newPost = await Post.create({
                title: req.body.title,
                body: req.body.body,
                createdBy: req.session.userId
            });
            const postId = newPost._id;
            const id = req.session.userId;
            const userPost = await User.findOneAndUpdate({ _id: id }, { $push: { posts: postId } });
            res.status(200).json(newPost);
        }
    } catch (err) {
        res.status(500).json(err);
    }

});

router.put('/:id', async(req, res) => {
    try {
        const modifiedPost = await Post.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title, body: req.body.body });
        if (modifiedPost) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const deletedPost = await Post.remove({
            _id: req.params.id
        });
        if (!deletedPost) {
            res.status(404).end();
        } else {
            res.status(200).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;