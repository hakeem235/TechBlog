const router = require("express").Router();
const { User, Post, Comments } = require('../../models');

//register
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    console.log("dbUserData", dbUserData)

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }


    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      console.log("login", req.session)
      res
        .status(200)
        .json({ id: dbUserData.id, user: dbUserData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});




module.exports = router;