var express = require('express');
var router = express.Router();

var remoteRequest = require('libs/remoteRequest');
var remote = require('libs/remote');

/* 获取管理员列表 */
router.get('/userList', function(req, res, next) {
 	var baseRequest = remoteRequest(req,res);
	var url = '/adminUser/getAdminUserList';
	var data = req.body;
	baseRequest.post(url,data,function(err, response, body) {
		console.debug('err' + err);
		console.debug('res' + response);
		console.debug('body' + body);
		var json = JSON.parse(body);
		console.log("json==>111"+json.code);
		if(json.code == 'SUCCESS') {
			res.render('xhs/user/userList', json);
		}
	})
});

/* 获取权限组 */
router.get('/getAuthGroup', function(req, res, next) {
	var baseRequest = remoteRequest(req,res);
	var url = '/authGroup/getAuthGroupList?id=1';
	var data = req.body;
	baseRequest.post(url,data,function(err, response, body) {
		res.end(body)
	})
});

/* 新增管理员 */
router.post('/addUser', function(req, res, next) {
 	var baseRequest = remoteRequest(req,res);
	var url = '/adminUser/addAdminUser';
	var data = req.body;
	baseRequest.post(url,data,function(err, response, body) {
		res.end(body)
	})
});

/* 删除管理员 */
router.post('/deleteUser', function(req, res, next) {
 	var baseRequest = remoteRequest(req,res);
	var url = '/adminUser/deleteAdminUser';
	var data = req.body;
	baseRequest.post(url,data,function(err, response, body) {
		res.end(body)
	})
});

/* 更新管理员 */
router.post('/updateUser', function(req, res, next) {
  	var baseRequest = remoteRequest(req,res);
	var url = '/adminUser/updateAdminUser';
	var data = req.body;
	console.debug('req params:' + JSON.stringify(data))
	baseRequest.post(url,data,function(err, response, body) {
		res.end(body)
	})
});

/*根据id查询管理员信息*/
router.post('/getUserById', function(req, res, next) {
	var baseRequest = remoteRequest(req,res);
	var url = '/adminUser/getAdminUserById';
	var data = req.body;
	console.debug('req params:' + JSON.stringify(data));
	baseRequest.post(url,data,function(err, response, body) {
		console.debug('req params:' + JSON.stringify(body));
		res.end(body)
	});
});

/*昵称筛选*/
router.get('/getNickName', function(req, res, next) {

	var options = {
		'userInfo'		: {
			'url'	: '/httpclient/adminUser/getCurrentUser',
			'data'	: '',
			'method': 'POST'
		},
		'nickName'		: {
			'url'	: '/httpclient/nick/getNickListByPage',
			'data'	: '',
			'method': 'POST'
		}
	};

	remote(req , res , options , function(data){
		data.userInfo = data.userInfo.userInfo;
		res.render('xhs/user/nick_name_list' , data );
	});

});

/*审核通过*/
router.post('/filterNick', function(req, res, next) {

	var data = req.body;
	data.nickList = JSON.parse(data.nickList);
	var options = {
		'check'		: {
			'url'	: '/httpclient/nick/filterNick',
			'data'	: data,
			'method': 'POST'
		},
	};

	remote(req , res , options , function(data){
		console.log(data);
		res.end();
		//res.render('xhs/user/nick_name_list' , data );
	});

});


module.exports = router;
