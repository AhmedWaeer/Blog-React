/* eslint-disable prettier/prettier */
const router = require('express').Router();
const { Comment, Post, User } = require('../../models');


router.post('/', async(req, res) => {

    try {
        const newComment = await Comment.create({
            body: req.body.body,
            createdBy: req.session.userId,
            post: req.body.postId
        });
        const id = req.body.postId;
        const _id = newComment.id;
        const userId = req.session.userId;
        const addedComment = await Post.findOneAndUpdate({ _id: id }, { $push: { comments: _id } });
        const addedUserComment = await User.findOneAndUpdate({ _id: userId }, { $push: { comments: _id } });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;