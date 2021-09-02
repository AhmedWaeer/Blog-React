/* eslint-disable prettier/prettier */
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    body: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }

})



const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;