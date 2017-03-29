var express = require('express');
var router = express.Router();
var controller = require('./user_posts.controller');
var validator = require('../../lib/validator');
var postValidationSchema = require('../../config/validation_schemas/post.validation.js')

router.post('/create', validator(postValidationSchema.create), controller.create);

module.exports = router;