/* Form usability
===============================================================*/

jQuery(document).ready(function($) {
	var inpt = $('input');
	
	inpt.focus(function(){
		$(this).parent().css('border-color','#4488bb');
		
	});
	inpt.blur(function(){
		if (!this.value)
			$(this).parent().css('border-color','#eeeeee');
		else $(this).next().next().css('display','none');
	});
	inpt.keyup(function(){
		if (!this.value){ 
			$(this).next().css('display','none');
			$(this).prev().css('opacity','0');
		}
		else{
			$(this).next().css('display','block');
			$(this).prev().css('opacity','1');
			$(this).next().next().css('display','none');
		}
	});
	$('.reset').on('click touch', function (){
		var inpt = $(this).prev();
		inpt.val('');
		inpt.focus();
		$(this).css('display','none');
		inpt.prev().css('opacity','0');//<-----убираем еще placehold-text
	});

	$('#checkbox-1').on('click touch', function (){
		$(this).next().css('border-color','#4488bb');
		$('.errch').css('display','none');
	});



//---------------Drop Down--------------------------------
	jQuery(document).ready(function($) {
		var dd = new DropDown( $('#dd') );
		$(document).click(function() {
			$('.wrapper-dd').removeClass('active');
		});
	});

	function DropDown(el) {
		this.dd = el;
		this.placeholder = this.dd.children('span');
		this.inpHidden = this.dd.children('input');
		this.opts = this.dd.find('ul.dropdown > li');
		this.val = '';
		this.index = -1;
		this.initEvents();
	}
	DropDown.prototype = {
		initEvents : function() {
			var obj = this;
			obj.dd.on('click', function(event){
				$(this).toggleClass('active');
				$('.errcountry').css('display','none');
				return false;
			});

			obj.opts.on('click',function(){
				var opt = $(this);
				obj.dd.css({'color':'#4488bb',
							'border-color':'#4488bb'});//<-----страна выбрана, оставляем границу и цвет текста
				obj.inpHidden.prev().css('opacity','1');//<-----показываем placehold-text
				obj.val = opt.text();
				obj.index = opt.index();
				obj.placeholder.text(obj.val);//<------то, что выводится в placeholder
				obj.inpHidden.val(obj.val);//<------меняем value в input hidden
				//console.log(obj.val);
			});
		},
		// getValue : function() {
		// 	return this.val;
		// },
		// getIndex : function() {
		// 	return this.index;
		// }
	}
//---------------Drop Down end----------------------------


/* Form Validation
===============================================================*/

	errBorder = function(el){
		el.css('border-color','#bb4444');
	}

		var email = $('#email'),
			name = $('#name'),
			country = $('#country'),
			ch = $('#checkbox-1');

	$('form').submit(function (e) {
		var error1 = 0,
		    error2 = 0,
		    error3 = 0,
		    error4 = 0,
			flag1=0,flag2=0,flag3=0,flag4=0;

		var tmp = email.val();
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (pattern.test(tmp) == false) {
            error1 = 1;
            flag1=email.parent();
            errBorder(flag1);
           	$('.erremail').css('display','block');
        };

        tmp = name.val();
        var latin = new RegExp(/^[a-zA-Z\s\-]+$/);
        var kirill = new RegExp(/^[а-яА-ЯёЁ\s\-]+$/);
		if ((tmp.length < 2) || ((latin.test(tmp)==true) || (kirill.test(tmp)==false)) && ((latin.test(tmp)==false) || (kirill.test(tmp)==true)) ) {
            error2 = 2;
            flag2=name.parent();
            errBorder(flag2);
            $('.errname').css('display','block');
        };

        tmp = country.val();
        
        if (tmp.length < 2) {
            error3 = 3;
            flag3=country.parent();
            errBorder(flag3);
            $('.errcountry').css('display','block');
        };

        if (!ch.prop('checked')){
        	error4 = 4;
        	flag4=ch.next();
        	errBorder(flag4);
        	$('.errch').css('display','block');
        };

        if ((error1 == 1) || (error2 == 2) || (error3 == 3) || (error4 == 4)){
        	return false;
        }else{
        	return true;
        }
    });
});