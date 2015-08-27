define(function(require , exports , module) {
	var $ = require('jquery');
	return function(){
		
		$('.category').bind('click' , function(){
			var categoryId = $(this).attr('id');
			$('#input_category_id').val(categoryId);
			$('#category_name').val($.trim($(this).html()));
		});

		$('.add_comment').bind('click' , function(){
			var data = [];
			var comment = {};
			var categoryId = $('#input_category_id').val();
			comment.content	= $('#content').val();
			data.push(comment);

			data = JSON.stringify(data);

			$.ajax({
				url			: '/common_comment/add_comment',
				type		: 'POST',
				data		: {
					categoryId:categoryId,
					commentList:data
				},
				dataType	: 'json'
			}).done(function(data){
				$('body').append(data);
			}).fail(function(data){
				console.log(data);
			});
		});

		$('body').on('click' , '.close' , function(){
			$('.modal').hide()
		});
		$('body').on('click' , '.close_ok' , function(){
			$('.modal').hide()
		});

		
		$('.add-frist-category').bind('click' , function(){

			$('#add_category_id').val('0');
			$('.add-category-dialog').show();
			$('.add-category-layer').show();	
		});

		$('.add_child_category').bind('click' , function(){
			$('#add_category_id').val($(this).attr('category_id'));
			$('.add-category-dialog').show();
			$('.add-category-layer').show();	
		});
		
		$('.dialog_close').bind('click' , function(){
			
			$('.add-category-dialog').hide();
			$('.add-category-layer').hide();	
		});

	}
});
