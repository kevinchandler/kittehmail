var express = require('express');
var router = express.Router();

var db = require('../lib/db.js');


router.get('/', function(req, res) {
  res.render('index', { title: 'KittehMail' });
});


router.post('/subscribe', function(req, res) {
	var emailRe = /^([a-z][a-z0-9\*\-\.]*):\/\/(?:(?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\-\.]|%[0-9a-f]{2})+|(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\]))(?::[0-9]+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@!$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/
  	var webhookUrl = emailRe.exec(req.body.webhookUrl)

  	if ( webhookUrl ) {
		
		var params = {
			webhookUrl: webhookUrl[0],
			ip: req.headers['X-Real-IP'] || req.connection.remoteAddress
		};

		// check to make sure isn't already subscribed
		db.findEntry( { webhookUrl: params.webhookUrl }, function(err, entry) {

			if ( err ) {
				console.log('db error');
				// return res.status(500).end()
				return res.render('index', { message: err })
				
			}

			else if ( entry ) {
				// return res.status(204).end()
				return res.render('index', { message: 'Success!'})
			}

			else if ( !entry ) {
				console.log('1');
				db.subscribe(params, function(err, succ) {
					if ( err ) {
						console.log('err');
						console.log(err);
						// return res.status(500).end()
						return res.render('index', { message: err })
					}
					else if ( succ ) {
						console.log('2');
						console.log('subscribed: ' + succ);
						// return res.status(200).end()
						return res.render('index', { message: 'Success!', success: true })
					}
					console.log('3');
				})

			}
		})
	}
	else {
		// res.status(500).end();
		return res.render('index', { message: 'invalid webhook url' });
	}
})

module.exports = router;
