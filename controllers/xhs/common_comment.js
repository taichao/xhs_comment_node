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
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
			res.end(JSON.stringify(jsonStr.result))
		}else{
			res.redirect('/login');
		}
	});	
});



module.exports=router
