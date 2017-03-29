var mongoose = require('mongoose');

var UserPostSchema = new mongoose.Schema({

	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	text: String,

}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})
module.exports = mongoose.model('UserPost', UserPostSchema);