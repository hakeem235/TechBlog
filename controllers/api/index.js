const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentsRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
