/*
	评论管理
	by zhangtaichao
 */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');

/* 发布评论列表 */
router.get('/release_comment_list', function(req, res, next) {

	res.render('xhs/comment/release_comment_list');  	
});

router.get('/comment', function(req, res, next) {

	res.render('xhs/comment/comment');  	
});

router.get('/comment_category' , function(req , res , next){
	var baseRequest = remoteRequest(req , res);

	var url = '/basecomment/getCategory';

	var data = req.body;

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			res.end(JSON.stringify(jsonStr.result))
		}else{
			res.redirect('/login');
		}
	});	
});

router.get('/search_comment' , function(req , res , next){
	var baseRequest = remoteRequest(req , res);

	var url = '/basecomment/queryRemoteComment';

	var data = req.query;
	data.queryType = 2;
	data.num = 10;

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
		console.log(jsonStr);
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			res.render('xhs/comment/comment_list' , jsonStr , function(err , html){
				res.send(html);
			});
			//res.end(JSON.stringify(jsonStr.result))
		}else{
			res.redirect('/login');
		}
	});
});

router.get('/category_comment' , function(req , res , next){
	var baseRequest = remoteRequest(req , res);

	var url = '/basecomment/queryBaseComment';

	var data = req.query;
	data.num = 10;

	console.log(data);
	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
		console.log(jsonStr);
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			res.render('xhs/comment/category_comment_list' , jsonStr , function(err , html){
				res.send(html);
			});
			//res.end(JSON.stringify(jsonStr.result))
		}
	});
});

module.exports=router
