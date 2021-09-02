const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);
const app = express();
const PORT = process.env.PORT || 3001;
app.use(logger("dev"));


mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://user-88:waeer@cluster0.rpvwt.mongodb.net/blog?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).
catch(error => handleError(error));

const helpers = require('./utils/helper');
app.use(cookieParser());
app.use(session({
    key: "user_sid",
    secret: 'hardworkhard',
    resave: false,
    saveUninitialized: false,
    cookie: {

    },
  

}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie("new_sid");
    }
    next();
});
const hbs = exphbs.create({ helpers });

app.use(cors({
    origin: '*'
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controller'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);

});