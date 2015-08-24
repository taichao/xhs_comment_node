var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');

router.get('/', function(req, res, next) {

	res.render('xhs/login');

});
router.get('/login', function(req, res, next) {

	res.render('xhs/login');

});

router.get('/index' , function(req , res , next){

	var baseRequest = remoteRequest(req , res);

	var url = '/article/refreshArticleList';

	var data = {
		cid:470,
		ctype:4001
	};

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
		console.log(jsonStr);
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			res.render('xhs/index' , jsonStr);
		}else{
			res.redirect('/login');
		}
	});

});

router.post('/login', function(req, res, next) {

    var baseRequest = remoteRequest(req,res)

    var url = '/login'
    var data = req.body;

    console.log('req params:' + JSON.stringify(data))
	baseRequest.post(url,data,function(err, response, body) {
		console.log(body);
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
			res.redirect('/index');
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
