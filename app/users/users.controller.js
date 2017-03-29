var User = require('./users.model')
var bcrypt = require('bcrypt')
exports.create = function(req, res) {

	User.findOne({
			email: req.body.email
		})
		.then(function(user) {

			if (user !== null) {
				res.status(409).json({
					success: false,
					message: "email already exists"
				})
				return;
			}

			return bcrypt.genSalt(10)
				.then(function(salt) {

					return bcrypt.hash(req.body.password, salt)
						.then(function(hashedPassword) {

							return new User({

								name: req.body.name,
								email: req.body.email,
								password: hashedPassword
							})
						})
				})
		})
		.then(function(user) {

			user.save()
				.then(function(saveduser) {

					res.status(200).json({
						success: true,
						message: "user registered"
					})
				})
				.catch(function(err) {

					res.status(500).json('internal server error')
				})
		})
		.catch(function(err) {

			res.status(500).json("internal server error")
		})

}