const router = require("express").Router();
const { Comments } = require('../../models');

router.get('/', (req, res) => {
  Comments.findAll({})
    .then(commentsData => res.json(commentsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Creates a new comment
router.post('/newcomment', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {

    const commentsData = await Comments.create({
      post_id: req.body.post_id,
      comments_text: req.body.comments_text,
      user_id: req.session.user_id
    });
    res.status(200).json(commentsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete comments
router.delete('/:id', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {

    const commentsData = await Comments.destroy({
      where: { id: req.params.id },
    });

    if (!postData) {
      res.status(404).json({ message: 'No comments found with that id!' });
      return;
    }

    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router
