var express = require('express');
var router = express.Router();
var controller = require('./users.controller.js')
var validator = require('../../lib/validator');
var userValidationSchema = require('../../config/validation_schemas/user.validation.js')

router.post('/create', validator(userValidationSchema.create), controller.create);

module.exports = router;