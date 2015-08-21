var index = require('./controllers/xhs/index');
var user = require('./controllers/xhs/user');
var comment = require('./controllers/xhs/comment');
var common_comment = require('./controllers/xhs/common_comment');
var article = require('./controllers/xhs/article');



module.exports = function(app){
	app.use('/', index);
	app.use('/user', user);
	app.use('/comment', comment);
	app.use('/common_comment', common_comment);
	app.use('/article' , article);
}
