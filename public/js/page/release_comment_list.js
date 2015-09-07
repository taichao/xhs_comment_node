define(function(require , exports , module) {
	var $ = require('jquery');
	var layer = require('../app/common/layer');

	var release_comment_list = function(){
		$('#key_search').bind('focus' , function(){
			$(this).val('');
		});
		$('#radio-01').bind('click' , function(){
			$('.key').show();
			$('#key_num').show();
			$('.category').hide();
		});

		$('#radio-03').bind('click' , function(){
			$('.key').show();
			$('#key_num').hide();
			$('.category').hide();
		});
		$('#radio-02').bind('click' , function(){
			$('.category').show();
			$('.key').hide();

			$.ajax({
				url			:'/comment/comment_category',
				type		:'GET',
				dataType	:'json'

			})
			.done(function(data) {
				console.log("get questionBank success");
				$('#category_select').find('option').each(function(index){
					if(index != 0){
						this.remove();
					}
				});
				child = [];
				data.forEach(function(category){
					var domEvent = "<option value='"+category.id+"' >"+category.item.name+"</option>"
					if(!category.leaf){
						var childEvent = '';
						category.child.forEach(function(categoryChild){
							childEvent += "<option value='"+categoryChild.id+"' >"+categoryChild.item.name+"</option>";
						});
						child[category.id] = childEvent;
					}
					$('#category_select').append(domEvent);
					var select_id = $('#category_select').find("option:selected").val()
				});
			})
			.fail(function(data) {
				console.log("get questionBank error");
			});
		});

		$('.search_comment').bind('click' , function(){
			var content = $('#key_search').val();
			var num = $('#key_num').val();
			var page = 1;
			$('#pre_page').hide();
			key_search(content , page , num);

		});
		$('#category_select').bind('change' , function(){
			var categoryId = $(this).find("option:selected").val();
			$('#category_select_child').html('<option value="0" >请选择</option>');
			$('#category_select_child').append(child[categoryId]);
			var page = 1;
			$('#pre_page').hide();
			category_search(categoryId , page);

		});
		$('#category_select_child').bind('change' , function(){
			var categoryId = $(this).find("option:selected").val();
			var page = 1;
			$('#pre_page').hide();
			category_search(categoryId , page);

		});

		$('#submit_commit_more').bind('click' , function(){
			var data = [];
			$('input[name="comment"]:checked').each(function(){
				var comment = {};
				comment.id = $(this).val();
				comment.comment = $('#content_'+$(this).val()).html();
				comment.nick = $('#nickname_'+$(this).val()).html();
				data.push(comment);
			});
			data = JSON.stringify(data);
			var articleId = $('#article_id').attr('article_id');

			push_comment(articleId , data);

		});
		$('#submit_commit_one').bind('click' , function(){
			var data = [];
			var comment = {};
			comment.comment = $('#user_comment').val();
			comment.nick = $('#user_nick').val();
			data.push(comment);
			data = JSON.stringify(data);
			var articleId = $('#article_id').attr('article_id');

			push_comment(articleId , data);

		});
	}

	var category_search = function(categoryId , page){
		
		layer.createLayer();	
		layer.banScroll();	
		$.ajax({
				url			: '/comment/category_comment?categoryId='+categoryId+'&page='+page,
				type		: 'GET',
				dataType	: 'html'
			})
			.done(function(data){
				$('#comment_list').html('')
				$('#comment_list').html(data);
				$('.page').attr('search' , categoryId).attr('type' , 'category');
				layer.allowScroll();
				layer.closeLayer();
			})
			.fail(function(){
				layer.allowScroll();
				layer.closeLayer();
				console.log('error');
			});
	}

	var key_search = function(content , page , num){
		
		var type = $('.radio:checked').val();
		layer.createLayer();	
		layer.banScroll();	
		$.ajax({
				url			: '/comment/search_comment?content='+content+'&page='+page+'&type='+type+'&num='+num,
				type		: 'GET',
				dataType	: 'html'
			})
			.done(function(data){
				$('#comment_list').html('')
				$('#comment_list').html(data);
				$('.page').attr('search' , content).attr('type' , 'key').attr('num' , num);;
				layer.allowScroll();
				layer.closeLayer();

			})
			.fail(function(){
				layer.allowScroll();
				layer.closeLayer();
				console.log('error');
			});
	}

	var push_comment = function(articleId , data){
		$.ajax({
		  url		: '/comment/push_comment',
		  type		: 'POST',
		  data		: {
				articleId:articleId,
				commentList:data
		  },
		  dataType	: 'html'
		})
		.done(function(data){
			$('#user_nick').val('');
			$('#user_comment').val('');
			$('body').append(data);
			$('input[name="comment"]:checked').attr('checked' , false);
		})
		.fail(function(data){
            console.log('error');
		});


	}

	$('#next_page').bind('click' , function(){
		var _this = this;
		var type = $(_this).attr('type');
		var content = $(_this).attr('search');
		var page = $(_this).attr('page');
		var page = $(_this).attr('num');
		if(type == 'key'){

			key_search(content , page , num);
		}else{
			
			category_search(content , page);
		}
		$('#pre_page').attr('page', page);
		$(_this).attr('page', parseInt(Number(page) + 1));
		$('#pre_page').show();
	});
	$('#pre_page').bind('click' , function(){
		var _this = this;
		var type = $(_this).attr('type');
		var content = $(_this).attr('search');
		var page = $(_this).attr('page');
		var page = $(_this).attr('num');
		if(type == 'key'){
			
			key_search(content , page , num);
		}else{
			
			category_search(content , page);
		}
		$('#next_page').attr('page' , page);
		if(page <= 1){
			$(_this).hide();
		}else{
			$(_this).attr('page' , parseInt(Number(page) - 1));
		}
	});

	$('body').on('click' , '.close' , function(){
		$('.modal').hide()
	});
	$('body').on('click' , '.close_ok' , function(){
		$('.modal').hide()
	});

	
	$('#all_checkbox').bind('click' , function(){
		$("input[name='comment']").prop('checked' , true);	
	});

	$('#all_not_checkbox').bind('click' , function(){
		$("input[name='comment']").prop('checked' , false);	
	});

	exports.release_comment_list = release_comment_list;

});
