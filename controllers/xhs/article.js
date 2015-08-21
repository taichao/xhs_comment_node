/*
	文章管理
	by zhangtaichao
 */
var express = require('express');
var router = express.Router();
var remoteRequest = require('libs/remoteRequest');

/* 进入文章管理界面 */
router.get('/aritclePre', function(req, res, next) {

  	//var baseRequest = remoteRequest(req,res)
	
	//var url = '/getMenu'
	//var data = req.query
	res.render('xhs/article/aritclePre')
	/*baseRequest.post(url,data,function(err, response, body) {
		res.render('xhs/article/aritclePre',JSON.parse(body))
	})*/
});



/* 七牛新增图片信息 */
router.post('/addVideoPic', function(req, res, next) {

  	var baseRequest = remoteRequest(req,res)

	var url = '/edumgmt/videoDetail/addVideoPic'
	var data = req.body
	console.debug(data);
	baseRequest.post(url,data,function(err, response, body) {
		console.debug('body' + body);
		obody = JSON.parse(body)
		var list = obody.result
		res.end(JSON.stringify(list))
	})
});

/*文章管理*/
router.get('/aritcleManage_list', function(req, res, next) {

	res.render('xhs/article/aritcleManage_list')

});


module.exports = router;
