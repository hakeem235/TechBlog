const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/api/users/home');
    return;
  }
  res.render('signup')
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/api/users/home');
    return;
  }
  console.log("loginpage");
  res.render('login')
});



module.exports = router;