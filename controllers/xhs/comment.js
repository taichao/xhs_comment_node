/*
	评论管理
	by zhangtaichao
 */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');

/* 进入文章管理界面 */
router.get('/commentPre', function(req, res, next) {

  	var baseRequest = remoteRequest(req,res)
	
	var url = '/getMenu'
	var data = req.query
	baseRequest.post(url,data,function(err, response, body) {
		res.render('xhs/comment/commentPre',JSON.parse(body))
	})
});

module.exports=router