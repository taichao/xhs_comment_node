define(function(require , exports , module) {
	var $ = require('jquery');
	return function(){
		$('#xhs_select_news').bind('change' , function(){
			var cid		= $("#xhs_select_news option:selected").attr('cid');
			var ctype	= $("#xhs_select_news option:selected").attr('ctype');
			$.ajax({
				url			: '/index',
				type		: 'POST',
				data		: {
					cid:cid,
					ctype:ctype
				},
				dataType	: 'html'
			}).done(function(data){
				$('#xhs_news_tbody').html('')
				$('#xhs_news_tbody').html(data)
			}).fail(function(data){
				console.log(data);
			});
		});	
		
	}
});
