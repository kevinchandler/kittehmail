var dotenv = require('dotenv').load();
	mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

var Notification = require('../db/schema/notification.js');



module.exports = {
	
	findEntry: function(params, cb) {

		Notification.findOne( { webhook: params.webhookUrl }, function(err, entry) {
			if ( err ) {
				return cb(err)
			}
			return cb(null, entry)

		})

	},

	subscribe: function(params, cb) {

		if ( !params.webhookUrl ) {
			return cb(new Error('must provide either an email address or webhook'));
		}

		var notification = new Notification({ 
			webhookUrl: params.webhookUrl,
		  	ip: params.ip || undefined
		});

		notification.save(function (err) {
		  if (err) {
		    return cb(new Error(err))
		  }
		  return cb(null, params.webhook) // return either email or webhook as success
		});

	},


}