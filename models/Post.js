const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const PostSchema = new Schema({

    title: {
        type: String,

    },
    body: {
        type: String,

    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})


PostSchema.plugin(deepPopulate, {
    whitelist: [
        'comments',
        'comments.createdBy'
    ]
});
const Post = mongoose.model('Post', PostSchema)

module.exports = Post;