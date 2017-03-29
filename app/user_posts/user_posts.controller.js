var UserPost = require('./user_post.model');
var User = require('../users/users.model')

exports.create = function(req, res) {

	var userPost = new UserPost({

		text: req.body.text,
		user_id: req.body.user_id
	})
	userPost.save()
		.then(function(savedPost) {

			res.status(200).json({
				success: true,
				message: "post created"
			})
		})
		.catch(function(err) {

			res.status(500).json({
				success: false,
				message: "internal server error"
			})
		})
}