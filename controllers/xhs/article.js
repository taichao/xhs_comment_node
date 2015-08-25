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
/*router.get('/article_list', function(req, res, next) {

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
  */
router.get('/article_list' , function(req , res , next) {
    var baseRequest = remoteRequest(req , res);

    var url = '/article/getArticleListByDate';

    var data = {
        publisDate:moment().format('YYYY-MM-DD')
    };

    baseRequest.post(url , data , function(err , response , body){
        var jsonStr = JSON.parse(body);
		jsonStr.day = data.publisDate;
        if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
            res.render('xhs/article/articleManage_list' , jsonStr);
        }else{
            res.redirect('/login');
        }
    });
});

//ajax 已发布的文章管理
router.post('/article_list' , function(req , res , next) {
    var baseRequest = remoteRequest(req , res);

    var url = '/article/getArticleListByDate';

	var data = req.body;

    baseRequest.post(url , data , function(err , response , body){
        var jsonStr = JSON.parse(body);
		jsonStr.day = data.publisDate;
		console.log(jsonStr);
        if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
            res.render('xhs/article/ajax_article_list' , jsonStr , function(err , html){
				res.send(html);
			});
        }else{
            res.redirect('/login');
        }
    });
});


/*绩效管理*/
router.get('/jixiao', function(req, res, next) {
    // var baseRequest = remoteRequest(req , res);
    var info = req.query;
    var url = '/selectCommentJnl';

    info.nickName = '1';
	info.createTime = moment().format('YYYY-MM-DD');

    var options = {
        'commentList' : {
            'url':'/httpclient/selectCommentJnl',
            'data':{
                userId		:info.nickName,
                addDate		:info.createTime,
                pageIndex	:"0",
                pageCount	:"50"
            },
            'method':'POST'

        },
        'userList' : {
            'url':'/httpclient/getAllAdminUserList',
            'data':{},
            'method':'POST'

        }

    }

    remote(req , res , options , function(data){
        data['userInfo'] = data.commentList.userInfo;
		data['day'] = info.createTime;
        console.log(data.userList.result);
        res.render('xhs/article/jixiao' , data);
    });

    /*
       var data = {
userId		:info.nickName,
addDate		:info.createTime,
pageIndex	:"0",
pageCount	:"50"
};

baseRequest.post(url , data , function(err , response , body){
var jsonStr = JSON.parse(body);
if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
res.render('xhs/article/jixiao' , jsonStr);
}else{
res.redirect('/login');
    // var json = JSON.stringify();
    }
    });
    */
});

/*绩效管理 ajax*/
router.post('/jixiao', function(req, res, next) {
    var baseRequest = remoteRequest(req , res);
    var info = req.body;
    var url = '/selectCommentJnl';

    var data = {
        userId		:info.nickName,
        addDate		:info.createTime,
        pageIndex	:"0",
        pageCount	:"50"
    };
	console.log(data);
    baseRequest.post(url , data , function(err , response , body){
        var jsonStr = JSON.parse(body);
        console.log(jsonStr);
        // res.end();
        if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
            res.render('xhs/article/ajax_jixiao_list' , jsonStr , function(err , html){
				res.send(html);
			});
        }else{
            res.redirect('/login');
            // var json = JSON.stringify();
        }
    });
});




/*文章管理*/
router.get('/adminUserList', function(req, res, next) {
    var baseRequest = remoteRequest(req , res);
    var url = '/getAllAdminUserList';
    var data = {
        // userId		:"1",
        // addDate		:"2015-08-19",
        // pageIndex	:"0",
        // pageCount	:"50"
    };
    baseRequest.post(url , data , function(err , response , body){
        var jsonStr = JSON.parse(body);
        console.log(jsonStr);
        // res.end();
        if('SUCCESS' == jsonStr.code || 'RESULT_EMPTY' == jsonStr.code){
            res.render('xhs/article/adminUserList' , jsonStr);
        }else{
            res.redirect('/login');
        }
    });
});





module.exports = router;
