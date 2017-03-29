var mongoose = require('mongoose');
var UserFolowingSchema = new mongoose.Schema({

	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	following_user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

module.exports = mongoose.model('UserFollowing', UserFolowingSchema);