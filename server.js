'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.render('index.html');
    res.end();
});

app.get('/whoami', function(req, res) {
	// console.log(req.headers);
	var myRegex = /(.*?),/
	//for language and os fields, try to use regular expression to filter out stuff I don't want.
	//but if regex fails, use whole string
	var returnObj = {
		'ipaddress' : req.headers.host,
		'language'  : (/(.*?),/.exec(req.headers['accept-language'])[1] || req.headers['accept-language']),
		'os'		: (/\((.*?)\)/.exec(req.headers['user-agent'])[1] || req.headers['user-agent'])
	};
	res.send(JSON.stringify(returnObj, false, ' '));
	res.end();
});

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});