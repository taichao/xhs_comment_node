var express = require('express');
var router = express.Router();

var remoteRequest = require('libs/remoteRequest');

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


module.exports = router;
