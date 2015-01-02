var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var notificationSchema = new Schema({
	webhookUrl: { type: String, lowercase: true, unique: true },
	active: { type: Boolean, default: true },
	ip: { type: String, unique: false },
	sends: { type: Number, default: 0 }
});

var Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification