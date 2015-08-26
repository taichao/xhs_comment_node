/*
	评论管理
	by wuhui
 */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');


//获取评论的分类
router.get('/common_comment_list' , function(req , res , next){
	var baseRequest = remoteRequest(req , res);

	var url = '/basecomment/getCategory';

	var data = req.body;

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
		console.log(jsonStr);
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			res.render('xhs/comment/common_comment_list' , jsonStr);
		}else{
			res.redirect('/login');
		}
	});	
});


//添加评论
router.post('/add_comment' , function(req , res , next){
	var baseRequest = remoteRequest(req , res);

	var url = '/basecomment/addComment';

	var data = req.query;
	data.commentList = JSON.parse(data.commentList);

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
		console.debug(jsonStr);

		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			var data = {
				'title' : "添加评论",
				'content' : "添加成功"
			}
			res.render('xhs/common/alert' , data , function(err , html){
				res.end(JSON.stringify(html))
			});
		}
	});	
});

module.exports=router
