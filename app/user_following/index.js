var router = require('express').Router();
var controller = require('./user_following.controller')

router.post('/follow', controller.follow);
router.post('/timeline', controller.timeline);

module.exports = router;