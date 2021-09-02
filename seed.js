let mongoose = require("mongoose");
let db = require("./models");

mongoose.connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useFindAndModify: false
});

let userSeed = [{
    username: "t@gmail.com",
    password: "12345"
}, {
    username: "z@gmail.com",
    password: "12345"
}];


db.User.insertMany(userSeed)

.then(data => {
        console.log(data + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });