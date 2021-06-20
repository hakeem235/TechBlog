const router = require('express').Router();
const { Comments, Post, User } = require('../models');
const Sequelize = require('sequelize');


router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;

  }
  res.render("homepage", {
  });
});


router.get("/home", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const userData = await Post.findAll({
      include: [User]
    });
    console.log(userData)
    const postArr = userData.map((post) => post.get({ plain: true }));
    console.log(postArr)

    res.render('homepage', {
      posts: postArr,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
  }
});

//new post
router.get('/newpost', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
      user_id: req.session.username,
    },
    attributes: [
      'id',
      'title',
      'content'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comments,
        attributes: ['id', 'user_id', 'post_id', 'comments_text'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      const post = dbPostData.map(post => post.get({ plain: true }));
      res.render('newPost', {
        post,
        loggedIn: true
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//dasbord
router.get('/dashbord', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,

    },

    attributes: [
      'id',
      'title',
      'content',
      'createdAt'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comments,
        attributes: ['id', 'user_id', 'post_id', 'comments_text'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {

      const post = dbPostData.map(post => post.get({ plain: true }));
      const comments = post.filter(post => post.comments)
      post.reverse();
      res.render('dashbord', {
        postArr: post,
        comments,
        loggedIn: req.session.loggedIn
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//view one post
router.get("/singlepost/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {

    const postData = await Post.findByPk(req.params.id, {
      include: [
        
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comments,
          attributes: ['id', 'post_id', 'user_id', 'comments_text'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    const singlePostData = postData.get({ plain: true });
    console.log(singlePostData)
    res.render('singelpost', {
      ...singlePostData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err)
  }
});

//edit post
router.get('/editpost/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'content'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comments,
        attributes: ['id', 'post_id', 'user_id', 'comments_text'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]

  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('editpost', {
      post,
      id : req.params.id,
      loggedIn: true
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});


//add comment
router.get('/addcomment', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render("newcomment", {
  });
})


//sign up page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render("signup", {
  });
});


//login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render('login')
})

router.get("/logout", (req, res)=>{
  if (req.session.loggedIn){
    req.session.destroy(() => {
      res.status(200).end()
    })
  }else{
    res.status(400).end()
  }

})

module.exports = router;