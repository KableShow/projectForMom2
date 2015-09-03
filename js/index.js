function workAllDay() {
	$(this).addClass('hide');
	$(this).siblings('.restAllDay').removeClass('hide');
	$(this).parents('.dayBox').find('.cover').click();
}
function addHalfDay() {
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
}

function deleteHalfDay() {
	var Box = $(this).parents('.dayBox').find('.dayWorkBox');
	var len = Box.length;
	if(len > 1)
		Box.last().remove();
}
function active(){
	$('.addHalfDay').on('click',addHalfDay);

	$('.deleteHalfDay').on('click',deleteHalfDay);

	$('.restAllDay').on('click',function () {
		$(this).addClass('hide');
		$(this).siblings('.workAllDay').removeClass('hide');
		$(this).parents('.dayBox').find('.noWorkButton').click();
	});

	$('.workAllDay').on('click',workAllDay);

	$('.noWorkButton').on('click',function () {
		$(this).parents('.dayWorkBox').find('.cover').removeClass('hide');
		$(this).parents('.dayWorkBoxIn').find('.pay').attr('disabled','disabled');
	});

	$('.cover').click(function () {
		$(this).addClass('hide');
		$(this).siblings('.dayWorkBoxIn').find('.pay').removeAttr('disabled');
	});

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
		var holiday = 0;
		/**  ¼ÆËãÈÕ¹¤×Ê×ÜºÍ  **/
		var payDom = $('.pay').not($('input[disabled=disabled]'));
		$.each(payDom,function (i,n) {
			realpay += Number(payDom[i].value);
		});
		$('#realpay').html(realpay.toFixed(2));
		/**  ¼ÆËãÐÝÏ¢ÌìÊý   **/
		var dayBox = $('.dayBoxArray');
		$.each(dayBox,function (i,n) {
			var i,j,t;
			t = dayBox.eq(i).find('.holidayCover').length;
			j = dayBox.eq(i).find('.pay').length;
			i = dayBox.eq(i).find('.pay').not($('input[disabled=disabled]')).length;
			if(t == 0){
				restDay += i == j?0:(i == 0)?1:0.5;
			}else{
				holiday++;
			}
		});
		$('#restDay').html(restDay.toFixed(1));
		$('#holiday').text(holiday);
		$('.holid')
		/**  ¼ÆËã¹¤×÷ÌìÊý  **/
		var day = Number($('#setDay')[0].value) - restDay.toFixed(1) - holiday;
		$('#workDay').html(day);
		/**  ¼ÆËãÈ«ÇÚ½±  **/
		len = 200 - 50*(Math.floor(restDay))<0?0:200 - 50*(Math.floor(restDay));
		$('#hasAward:checked').length == 0?len = 0:void(0);
		$('#award').html(len);
		/**  ¼ÆËã×Ü¹¤×Ê  **/
		$('#salary').html((realpay+len).toFixed(2));
	});
	
	$('#restAllMonth').on('click',function () {
		$('.restAllDay').click();
	});

	$('#workAllMonth').on('click',function () {
		$('.workAllDay').click();
	});

	$('.dayNumber').on('click',function(){
		var that = $(this);
		var dom = that.parent().siblings('.dayBoxArray').find('.dayWorkBox');
		if(dom.find('.holidayCover').length == 0){
			var html = $('#holidayCoverModule').html();
			that.siblings('.restAllDay').click();
			that.siblings('.workAllDay').off('click',workAllDay);
			that.siblings('.addHalfDay').off('click',addHalfDay);
			that.siblings('.deleteHalfDay').off('click',deleteHalfDay);
			dom.append(html);
		}else{
			dom.find('.holidayCover').remove();
			that.siblings('.workAllDay').on('click',workAllDay);
			that.siblings('.addHalfDay').on('click',addHalfDay);
			that.siblings('.deleteHalfDay').on('click',deleteHalfDay);
		}
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
		$('#setDay,#setDayBtn,#hasAward').attr("disabled","disabled");
		$('#monthDay').text(day);
		buildDayBox(day);
		active();
	});
		
});