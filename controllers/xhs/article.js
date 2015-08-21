/*
	文章管理
	by wuhui
 */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');

/* 进入文章管理界面 */
router.get('/article_list', function(req, res, next) {

	res.render('xhs/article/article_list');

});


/*文章管理*/
router.get('/articleManage_list', function(req, res, next) {

	res.render('xhs/article/articleManage_list')

});
