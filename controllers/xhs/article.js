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

    var baseRequest = remoteRequest(req , res);

    var url = '/article/getArticleListByDate';

    var data = {
         publisDate:"2015-08-21"
    };

	baseRequest.post(url , data , function(err , response , body){
		var jsonStr = JSON.parse(body);
        console.log(jsonStr);
		if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
            res.render('xhs/article/article_list' , jsonStr);
		}else{
			res.redirect('/login');
		}
	});

});

module.exports = router;
