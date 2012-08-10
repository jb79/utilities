			//Add slide
			function addSlide(){
				var max_slides = $('#nav li').length;
				if (max_slides == 50) { 
					alert('Hey buddy, is this a slideshow or a novel? Lets keep it under 50 slides.');
					return false;
				} else {
					$('<div class="slide"><h3><span  contenteditable="true">Enter Slide Title</span></h3><ul contenteditable="true"><li>Click to edit / add text</li></ul></div>').appendTo('#slide_wrapper');
					
					$('<li><a href="javascript:void(0)" class="nav_link" slide="'+ (max_slides) +'">'+ (max_slides + 1)  +'</a></li>').appendTo('#nav');
					$('.slide').stop(false, true).hide();
					$('.nav_link').removeClass('hit');
					$('.nav_link[slide="' + (max_slides) + '"]').addClass('hit');	
					$('.slide:eq(' + max_slides + ')').stop(false, true).fadeIn('slow', function(){localStorage.setItem("slideshow", $('#slide_wrapper').html());});	
				}
			}
			
			//Remove slide
			function removeSlide(){
				if($('#nav li').length > 1) {
					$('#slide_wrapper .slide:eq('+ parseInt($('#nav li a.hit').attr('slide')) +')').remove();
				
				if ($('#nav li a.hit').attr('slide') >= 0 ) {
					moveSlide(parseInt(($('#nav li a.hit').attr('slide')) -  1));
					
				} else {		
					moveSlide(parseInt(($('#nav li a.hit').attr('slide')) +  1));
					
				}
			
					createMenu(parseInt($('#nav li a.hit').attr('slide')));
					localStorage.setItem("slideshow", $('#slide_wrapper').html());
				
				} else {
					alert("Hey, I like minimalism too but don't you think we should have at least one slide there, Kazimir Malevich?");
				}
			
			}	

//Goto

	function moveSlide(slide) {
		var cs = null;
		if (slide >= ($('#nav li').length)) {
			cs = 0;
		
		} else {
						
			cs = slide;
		} 
		
			if (slide != parseInt($('#nav li a.hit').attr('slide'))) {
				$('.slide').hide();
				$('.slide:eq(' + cs + ')').stop(false, true).fadeIn('slow');
				localStorage.setItem("currentslide", cs);	

			} 
	}
	
	
	
	
	// Create menu
	function createMenu(s) {
		$('#nav').remove();
		$('<ul id="nav"></ul>').appendTo('body');
		 $('.slide').each(function(e){
		 
		 	$('<li><a href="javascript:void(0)" class="nav_link" slide="'+ e +'">'+ (e + 1)  +'</a></li>').appendTo('#nav');
		 });	
	
		 if (parseInt(s) >= 1) {
		 	$('.nav_link[slide='+parseInt((s - 1))+']').addClass('hit'); 
		 } else {
		 	
		 	var saved_slide = parseInt(localStorage.getItem('currentslide'));
		 	if (saved_slide != null && saved_slide > 0 ) {
	
			 	$('.nav_link[slide='+ saved_slide  +']').addClass('hit'); 
			 	$('.slide').hide();
			 	$('.slide:eq('+ (saved_slide) +')').stop(false, true).fadeIn('slow');
		 	} else {

		 		$('.nav_link[slide=0]').addClass('hit'); 
		 		$('.slide').hide();
		 		$('.slide:eq(0)').stop(false, true).fadeIn('slow');
		 		
		 	}
		 	

		 	
		 }
	}	
$(function(){



	if (localStorage.getItem('slideshow') != null){	 $('#slide_wrapper').html(localStorage.getItem('slideshow'));$('.slide').css('opacity','1')}
	$('.slide > ul, h3 > span').attr('contenteditable','true').keyup(function(){ localStorage.setItem("slideshow", $('#slide_wrapper').html()); });
	
	$('h3 > span').blur(function(){

		if ($(this).html().length === 0) {
			$(this).html('Enter Slide Title');
			localStorage.setItem("slideshow", $('#slide_wrapper').html());

		}
	})
	
	$('.slide > ul ').keyup(function(){
		if($(this).children('li').length < 1) {
			$(this).html('<li>Click to edit / add text</li>');
			localStorage.setItem("slideshow", $('#slide_wrapper').html());
		}
	});
	

	//Create + & -
	$('<ul id="add_remove"><li><a href="javascript:void(0)" id="add_slide" title="Add slide">+</li><li><a href="javascript:void(0)" id="remove_slide" title="Remove slide">-</li><li id="remove_all"><a href="javascript:void(0)" title="Remove all slides">[- all]</a></li><li id="theme"><a href="javascript:void(0)" title="Click to swap themes">Theme: DCP</a></li></ul>').appendTo('body');

	 createMenu();
	
	$('.nav_link').live("click", function(){
		
		moveSlide(parseInt($(this).attr('slide')));
		$('.nav_link').removeClass('hit');
		$(this).addClass('hit');
	});
	//	$('.nav_link[slide="0"]').addClass('hit'); 
		
	
	
			
			
			$('#add_slide').live('click', function(){ addSlide(); });
			
			//Remove slide
			$('#remove_slide').click(function(){ removeSlide()});
		
			$('#remove_all').click(function(){
			
				var deleteall = confirm('Delete '+$('#nav li').length+' slide(s) and start over?')
				if (deleteall){
					localStorage.removeItem('currentslide');
					localStorage.removeItem('slideshow');
					localStorage.removeItem('theme');
					window.location.reload( false );
				}
			})

			$('#theme').toggle(function(){
		
				$('html, body').addClass('web375');
				$('#theme').html('<a href="javascript:void(0)" title="Click to swap themes">Theme: Web 3.75</a>');
				localStorage.setItem('theme', 'web375');
				
			},function(){
				$('html,body').removeClass('web375');
				$('#theme').html('<a href="javascript:void(0)" title="Click to swap themes">Theme: DCP</a>');
				localStorage.setItem('theme', 'dcp');	
			});
			
			
	if (localStorage.getItem('theme') != null){ if(localStorage.getItem('theme') == "web375") { $('html, body').addClass('web375');$('#theme').html('<a href="javascript:void(0)" title="Click to swap themes">Theme: Web 3.75</a>'); } }
	

//keyboard mapping			
		});	//end on load


		$(document).keydown(function(e){
			
			function keySlide(slide) {
				
				if (slide <= ($('#nav li').length - 1) ) {
					cs = slide;
				} else if (slide == ($('#nav li').length)){
					cs = 0;
				} else if (slide < 0) {
					cs = $('#nav li').length - 1;
				} else {
					cs = slide;
				}
				
				$('.nav_link').removeClass('hit');	
				$('.nav_link[slide='+cs+']').addClass('hit'); 
				$('.slide').stop(false, true).hide();
				$('.slide:eq(' + cs + ')').stop(false, true).fadeIn('slow');
				localStorage.setItem("currentslide", cs);	
			}
		
		
    		
    		if (e.keyCode == 40) {  //left arrow
				if (parseInt($('#nav li a.hit').attr('slide')) === 0) {
	    			keySlide((parseInt($('#nav li').length) - 1));
	    		} else {
	    			keySlide((parseInt($('#nav li a.hit').attr('slide')) - 1));
	    		}

    		} else if(e.keyCode == 38) { //right arrow
    		
				if (parseInt($('#nav li a.hit').attr('slide')) === 0) {
	    			keySlide(1);
	    		} else {
	    			keySlide((parseInt($('#nav li a.hit').attr('slide')) + 1));
	    		}
	 
    		}
				
				if(e.which == 17) ctrl=false;
				}).keydown(function(e) {
				if(e.which == 17) ctrl= true;
				
				if(e.which == 65 && ctrl == true) {
					addSlide();
					return false;
				} else if (e.which == 68 && ctrl == true) {
					removeSlide();
				}
    		
		});	
		
		