const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({

    username: {
        type: String,
        unique: true

    },
    password: {
        type: String,
        required: 'Enter your password'

    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})



const User = mongoose.model('User', userSchema)
module.exports = User;