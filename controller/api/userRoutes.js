/* eslint-disable prettier/prettier */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');


router.post('/', (req, res) => {
    console.log(req.body)

    var user = new User({
        username: req.body.email,
        password: req.body.password,
    });
    user.password = bcrypt.hashSync(user.password, 10);
    user.save((err, docs) => {
        if (err) {
            res.redirect("/signup");
        } else {

            res.status(200).json(docs);


        }
    });
});




router.post('/login', async(req, res) => {

    try {
        const user = await User.find({ username: req.body.email });
        console.log(user);
        console.log(req.body.password);

        if (!user) {
            res.status(404).json({ message: 'Inccorect email' })
            return;
        }
        console.log(user[0].password)
        const isValid = await bcrypt.compare(
            req.body.password,
            user[0].password
        );
        console.log(isValid)
        if (!isValid) {
            res.status(404).json({ message: 'Inccorect password' })
            return;
        }
        req.session.save(() => {
            req.session.userId = user[0]._id;
            req.session.user = user[0];
            req.session.loggedIn = true;
            res.json({ message: 'you are logged in sucssesfully' });

        })

    } catch (error) {
        console.log(error)
    }
});

router.post('/logout', async(req, res) => {

    if (req.session.user) {

        req.session.destroy(() => {

            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

})



module.exports = router;
