var express = require('express');
var router = express.Router();
var controller = require('./user_posts.controller');
var validator = require('../../lib/validator');
var postValidationSchema = require('../../config/validation_schemas/post.validation.js');
var auth = require('../../auth/auth.service.js')

router.post('/create', auth.isAuthenticated(), validator(postValidationSchema.create), controller.create);

module.exports = router;