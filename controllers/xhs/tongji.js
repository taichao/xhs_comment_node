/*
   文章管理
   by wuhui
   */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');
var remote = require('libs/remote');
var moment = require('moment');

/* 进入文章管理界面 */
router.get('/zongliang', function(req, res, next) {

	var options = {
		'userInfo'		: {
			'url'	: '/httpclient/adminUser/getCurrentUser',
			'data'	: '',
			'method': 'POST'
		},
		'allDayComments'		: {
			'url'	: '/httpclient/getLocalEverydayCommentsNums',
			'data'	: '',
			'method': 'post'
		},
		'todayComments'		: {
			'url'	: '/httpclient/getTodayCommentsNums',
			'data'	: '',
			'method': 'post'
		},
		'todayXHSComments'		: {
			'url'	: '/httpclient/getTodayxhsNums',
			'data'	: '',
			'method': 'post'
		}
	};

	remote(req , res , options , function(data){
		data.userInfo = data.userInfo.userInfo;
		res.render('xhs/tongji/zongliang' , data );
	});

});


module.exports = router;
