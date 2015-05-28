function active(){
	$('.addHalfDay').on('click',function () {
		var Box = $(this).parents('.dayBox').find('.dayWorkBox');
		var len = Box.length;
		var that = $(this);
		if(len < 3){
			var boxarray = $(this).parents('.dayBox').find('.dayBoxArray');
			var html = $('#halfDayBoxModule').html();
			boxarray.append(html);
			that.parents('.dayBox').find('.noWorkButton').on('click',function () {
				var dom = $(this).parents('.dayWorkBox').find('.cover');
				dom.removeClass('hide');
				dom.on('click',function () {
					$(this).addClass('hide');
					$(this).siblings('.dayWorkBoxIn').find('.pay').removeAttr('disabled');
				});
				$(this).parents('.dayWorkBoxIn').find('.pay').attr('disabled','disabled');
			});
		}
	});

	$('.deleteHalfDay').on('click',function () {
		var Box = $(this).parents('.dayBox').find('.dayWorkBox');
		var len = Box.length;
		if(len > 1)
			Box.last().remove();
	});

	$('.restAllDay').on('click',function () {
		$(this).addClass('hide');
		$(this).siblings('.workAllDay').removeClass('hide');
		$(this).parents('.dayBox').find('.noWorkButton').click();
	});

	$('.workAllDay').on('click',function () {
		$(this).addClass('hide');
		$(this).siblings('.restAllDay').removeClass('hide');
		$(this).parents('.dayBox').find('.cover').click();
	});

	$('.noWorkButton').on('click',function () {
		$(this).parents('.dayWorkBox').find('.cover').removeClass('hide');
		$(this).parents('.dayWorkBoxIn').find('.pay').attr('disabled','disabled');
	});

	$('.cover').click(function () {
		$(this).addClass('hide');
		$(this).siblings('.dayWorkBoxIn').find('.pay').removeAttr('disabled');
	});


	/*
	$('input[type=number]').on('keyup',function(){
		var sum = 0,
		    inputDom = $('input[type=number]');
		$.each(inputDom,function(i,n){
			sum += Number(inputDom[i].value);
		});
		$('.show-area span').html(sum.toFixed(2));
	});
	*/

	$('#clean').click(function(){
		var inputDom = $('.pay');
		$.each(inputDom,function(i,n){
			inputDom[i].value = "";
		});
	});

	$('#sumAll').click(function(){
		var len = $('.dayBox').length;
		var restDay = 0;
		var realpay = 0;
		/**  计算日工资总和  **/
		var payDom = $('.pay').not($('input[disabled=disabled]'));
		$.each(payDom,function (i,n) {
			realpay += Number(payDom[i].value);
		});
		$('#realpay').html(realpay.toFixed(2));
		/**  计算休息天数   **/
		var dayBox = $('.dayBoxArray');
		$.each(dayBox,function (i,n) {
			var i,j;
			j = dayBox.eq(i).find('.pay').length;
			i = dayBox.eq(i).find('.pay').not($('input[disabled=disabled]')).length;
			restDay += i == j?0:(i == 0)?1:0.5;
		});
		$('#restDay').html(restDay.toFixed(1));
		/**  计算工作天数  **/
		var day = Number($('#setDay')[0].value) - restDay.toFixed(1);
		$('#workDay').html(day);
		/**  计算全勤奖  **/
		len = 200 - 50*(Math.floor(restDay))<0?0:200 - 50*(Math.floor(restDay));
		$('#award').html(len);
		/**  计算总工资  **/
		$('#salary').html(realpay+len);
	});
	
	$('#restAllMonth').on('click',function () {
		$('.restAllDay').click();
	});

	$('#workAllMonth').on('click',function () {
		$('.workAllDay').click();
	});

};

function buildDayBox (day) {
	var html1 = $('#allDayBoxModule1').html();
	var html2 = $('#allDayBoxModule2').html();
	var i = 1, j = day,
		 allhtml = '';
	for(;i<=j;i++){
		allhtml += html1 + i + html2;
	}
	$('body').append(allhtml);
}

function sum() {
	var len = arguments.length,
		  i = 0,
		  sum = 0;
	for(;i < len;i++){
		sum += arguments[i];
	}
	return sum.toFixed(2);
}

$(function(){
	$('#setDayBtn').on('click',function () {
		var day = Number($('#setDay')[0].value);
		$('#setDay,#setDayBtn').attr("disabled","disabled");
		buildDayBox(day);
		active();
	});
		
});