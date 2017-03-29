var UserFollowing = require('./user_following.model');
var User = require('../users/users.model.js')
var UserPost = require('../user_posts/user_post.model')

exports.follow = function(req, res) {

	var userId = req.user._id;
	var followingEmail = req.body.followingEmail;

	//check whether following user is valid
	User.findOne({
			email: followingEmail
		})
		.then(function(user) {

			if (user === null) {

				res.status(404).json({
					success: false,
					message: "invalid user"
				})
				return;
			}
			//check whether is alredy followed or not
			return UserFollowing.findOne({
					user_id: userId,
					following_user_id: user._id
				})
				.then(function(alreadyFollowing) {

					if (alreadyFollowing !== null) {
						res.status(200).json({
							success: true,
							message: "already followed"
						})
						return;
					} else {

						//if not followed then follow user
						var followUser = new UserFollowing({
							user_id: userId,
							following_user_id: user._id
						})
						followUser.save()
							.then(function(savedFollow) {

								res.status(200).json({

									success: true,
									message: "followed"
								})
							})
							.catch(function(err) {

								res.status(200).json({

									success: false,
									message: "internal server error"
								})
							})
					}
				})
		})
		.catch(function(err) {

			res.status(200).json({

				success: false,
				message: "internal server error"
			})
		})
}

function normalizeUser(arr) {

	var users = [];

	for (var i = 0; i < arr.length; i++) {

		users.push(arr[i].following_user_id)
	}
	return users;
}

exports.timeline = function(req, res) {

	//get all the users user is following
	UserFollowing.find({

			user_id: req.user._id
		}, 'following_user_id -_id')
		.then(function(userFollowing) {

			var users = normalizeUser(userFollowing);
			UserPost.find({
					user_id: {
						$in: users
					}
				}, 'text user_id created_at')
				.populate({
					model: 'User',
					path: 'user_id',
					select: 'name email -_id'
				})
				.sort('-created_at')
				.skip(req.body.skip)
				.limit(req.body.limit)
				.then(function(userPosts) {

					res.status(200).json({
						success: true,
						message: "timeline",
						data: userPosts
					})
				})
		})
}