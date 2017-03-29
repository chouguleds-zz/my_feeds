var router = require('express').Router();
var controller = require('./user_following.controller')
var auth = require('../../auth/auth.service.js')

router.post('/follow', auth.isAuthenticated(), controller.follow);
router.post('/timeline', auth.isAuthenticated(), controller.timeline);

module.exports = router;