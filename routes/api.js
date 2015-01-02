var express = require('express'),
	router = express.Router();

var db = require('../lib/db.js');

router
	.post('/subscribe', function(req, res) {
		console.log(req.body);

		var params = {
			webhookUrl: req.body.webhookUrl,
			ip: req.headers['X-Real-IP'] || req.connection.remoteAddress
		};

		// check to make sure isn't already subscribed
		if ( params.webhookUrl && params.ip ) {
			db.findEntry( { webhookUrl: params.webhookUrl }, function(err, entry) {

				if ( err ) {
					console.log('db error');
					return res.status(500).end()
					
				}

				else if ( entry ) {
					console.log('entry exists');
					return res.status(204).end()
				}

				else if ( !entry ) {
					db.subscribe(params, function(err, succ) {
						if ( err ) {
							console.log(err);
							return res.status(500).end()
						}
						if ( succ ) {
							console.log('subscribed: ' + succ);
							return res.status(200).end()
						}
					})

				}
			})
		}
		else {
			res.status(500).end();
			console.log('no webhookUrl && ip');
		}
	})


module.exports = router;
