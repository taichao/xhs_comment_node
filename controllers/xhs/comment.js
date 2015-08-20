/*
	评论管理
	by wuhui
 */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');
var checkLogin = require('libs/checkLogin')

/* 发布评论列表 */
router.get('/release_comment_list', function(req, res, next) {

	var data = req.query;
	checkLogin(req , res , function(){

		var url = "/getMenu";
		baseRequest = remoteRequest(req , res);
		baseRequest.post(url , data , function(err , response , body){
			var jsonStr = JSON.parse(body);
			jsonStr.title = data.title;
			jsonStr.id = data.id;
			if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
				res.render('xhs/comment/release_comment_list' , jsonStr);  	
			}else{
				res.redirect('/login');
			}
		});
	});

});

router.get('/comment', function(req, res, next) {

	res.render('xhs/comment/comment');  	
});

//获取评论的分类
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


//通过关键词获取评论列表
router.get('/search_comment' , function(req , res , next){
	var baseRequest = remoteRequest(req , res);

	var url = '/basecomment/queryRemoteComment';

	var data = req.query;
	data.queryType = 2;
	data.num = 10;

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
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

//根据分类回去评论列表
router.get('/category_comment' , function(req , res , next){
	var baseRequest = remoteRequest(req , res);

	var url = '/basecomment/queryBaseComment';

	var data = req.query;
	data.num = 10;

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			res.render('xhs/comment/category_comment_list' , jsonStr , function(err , html){
				res.send(html);
			});
			//res.end(JSON.stringify(jsonStr.result))
		}
	});
});

//向新华社推送评论
router.get('/push_comment' , function(req , res , next){
	var baseRequest = remoteRequest(req , res);

	var url = '/basecomment/commentIt';

	var data = req.query;
	data.commentList = JSON.parse(data.commentList);

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			var data = {
				'title' : "评论",
				'content' : "评论成功"
			}
			res.render('xhs/common/alert' , data , function(err , html){
				res.send(html);
			});
		}
	});
});




module.exports=router
