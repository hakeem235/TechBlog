const router = require('express').Router();
const apiRoutes = require('./api');
const enter = require('./enter-site.js');

router.use('/', enter);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;