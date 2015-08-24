/*
	文章管理
	by wuhui
 */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');
var remote = require('libs/remote');

/* 进入文章管理界面 */
router.get('/article_list', function(req, res, next) {
	
	var options = {
		'index'		: {
			'url'	: '/api/index',
			'data'	: '',
			'method': 'GET'
		},
		'test'		: {
			'url'	: '/api/test',
			'data'	: '',
			'method': 'GET'
		}
	};

	remote(req , res , options , function(data){
		res.end(JSON.stringify(data));	
	});


});


/*文章管理*/
router.get('/articleManage_list', function(req, res, next) {

	res.render('xhs/article/articleManage_list')

});

module.exports = router;
