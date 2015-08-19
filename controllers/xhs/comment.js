/*
	评论管理
	by zhangtaichao
 */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');

/* 通用评论列表 */
router.get('/common_comment_list', function(req, res, next) {

	res.render('xhs/comment/article_comment_list');  	
});

router.get('/comment', function(req, res, next) {

	res.render('xhs/comment/comment');  	
});

module.exports=router
