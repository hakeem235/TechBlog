const router = require("express").Router();
const { Post, Comments, User } = require('../../models');


// gets all posts and all its database columns
router.get('/all', async (req, res) => {
  // If there is no session user id, redirects to the login page and blocks access
  if (!req.session.user_id) {
    res.redirect("/")
  }

  try {
    const dbPostData = await Post.findAll({});
    const postPlain = dbPostData.map((post) => post.get({ plain: true }))

    res.render('post', {
      postsArr: postPlain,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//post by id
router.get('/:id', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }

  try {
    // Finds a post by 
    const dbPostData = await Post.findByPk(req.params.id);

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    //res.status(200).json(dbBirdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete('/:id/delete', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



//post based on id
router.get('/:id', (req, res) => {
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
        attributes: ['id', 'user_id', 'post_id', 'comments_text'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with id provided!' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('singlepost', {
        post,
        loggedIn: req.session.loggedIn
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create post
router.post('/create', (req, res) => {
  Post.create({
    user_id: req.session.user_id,
    title: req.body.title,
    content: req.body.content
  }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//edit post

router.put('/:id', (req, res) => {
  Post.update({
    title: req.body.title,
    content: req.body.content
  },
    {
      where: {
        id: req.params.id
      }
    }).then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(dbPostData);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


module.exports = router
