define(function(require , exports , module) {
	var $ = require('jquery');
	return function(){
		$('#all_checkbox').bind('click' , function(){
			$('input[name="nick"]').prop('checked' , true);	
		});
		
		
		$('#all_not_checkbox').bind('click' , function(){
			$('input[name="nick"]').prop('checked' , false);	
		});

		$('.more_ok').bind('click', function(){
			var data = [];
			$('input[name="nick"]:checked').each(function(idx , obj){
				var check_id = $(obj).val();
				var nickList = {};
				nickList.id = $('#id_'+check_id).html();
				nickList.nickname = $.trim($('#nickname_'+check_id).html());
				data.push(nickList);
			});
			data = JSON.stringify(data);
			change_nick(data);
		});

		var change_nick = function(data){
			$.ajax({
				url:'/user/filterNick',
				dataType:'html',
				type:'POST',
				data:{
					'nickList' : data
				},
			})
			.done(function(data){
				console.log(data);
			})
			.fail(function(data){
				console.log(data);
			});
		}
	}
});
