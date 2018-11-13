var assert = require('assert');
var path = require('path');
var request = require('request');
var express = require('express');

var ssr = require('../lib/index');

describe("done-ssr middleware", function() {
	this.timeout(10000);

	it('uses middleware in an Express application', function(done) {
		var root = path.join(__dirname, 'tests');
		var app = express()
			.use('/', express.static(root))
			.use('/', ssr({
				config: path.join(root, 'package.json') + '!npm'
			}, {
				strategy: "seo"
			}));

		var server = app.listen(5500);

		server.on('listening', function() {
			request('http://localhost:5500', function(err, res, body) {
				assert.equal(res.statusCode, 200);
				assert.ok(/You are home/.test(body), 'Got body');
				assert.ok(/Showing: \//.test(body),
						  'The request object is accessible from the AppViewModel');
				assert.ok(/progressive\/index.stache!done-autorender/.test(body),
							'The "main" is set correctly')

				var contentType = res.headers['content-type'];
				assert.equal(contentType, 'text/html; charset=utf-8',
							 'set the correct content type');
				server.close(done);
			});
		});
	});
});
