var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');

router.get('/', function(req, res, next) {
	
	res.render('xhs/login');
		
});
router.get('/login', function(req, res, next) {
	
	res.render('xhs/login');
		
});

router.post('/login', function(req, res, next) {

  	var baseRequest = remoteRequest(req,res)
	
	var url = '/login'
	var data = req.body;

	console.debug('req params:' + JSON.stringify(data))
	baseRequest.post(url,data,function(err, response, body) {
		var jsonStr = JSON.parse(body);
		if('SUCCESS' == jsonStr.code) {
			var setCookie		= response.headers['set-cookie'];
			var sessionArray	= setCookie[0].split(';');
			var cookieArray		= sessionArray[0].split('=');

			console.debug(setCookie);
			console.debug(sessionArray);
			console.debug(cookieArray);

			//设置cookie
			res.cookie(cookieArray[0], cookieArray[1], { expires: new Date(Date.now() + 900000), httpOnly: true });
			console.debug(jsonStr);
			res.render('xhs/index', jsonStr);
		} else {
			res.render('xhs/login', jsonStr);
		}
	})
});

//退出登录
router.get('/logout', function(req, res, next) {
	var baseRequest = remoteRequest(req,res);
	var url = '/logout';
	var data = req.query;
	baseRequest.get(url,data,function(err, response, body) {
		console.debug('body==>'+body);
		res.render('xhs/login');
	});
});

module.exports = router;
