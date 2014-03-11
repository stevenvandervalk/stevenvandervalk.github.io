$(window).bind('load', function() {
	$('#loading').fadeOut(function() {

		$('#intro header').show();
		TweenMax.from( $('#intro header'), 1.2, {css:{marginTop: '-50px', opacity: 0}, onComplete:bringInTheRest});
		// $('#intro header').animate({
		// 	opacity: 1,
		// 	marginTop: '-100px'
		// }, 1200, 'easeOutQuart', function() {
		// 	$('#work, #info, .view-work').fadeIn(500);
		// });

	});
});

function bringInTheRest() {
	$('#work, #info, .view-work').show();
	TweenMax.from( $('.view-work'), 0.5, {css:{ opacity: 0}});
	TweenMax.from( $('.view-work'), 2, {css:{ marginTop: '20px'}, repeat:-1, yoyo: true, ease:Quad.easeInOut });

	//sliders
	var swipes = [];
	$('.slides').each(function(i, obj) {
		var $project = $(this).closest('.project');
		swipes[i] = new Swipe(obj, {
			callback: function(index) {
				$project.find('.counter .current').html(swipes[i].getPos()+1);
			}
		});

		var $this = swipes[i];

		$project.find('.counter .total').html($this.getNumSlides());

		$project.find('.prev').on('click', function(e) {
			e.preventDefault();
			$this.prev();
		});

		$project.find('.next').on('click', function(e) {
			e.preventDefault();
			$this.next();
		});
	});
}


//set intro height
function resizeContent() {
	var winHeight = $(window).height();
	$('#intro').css('height', winHeight+'px' );
}

$(document).ready(function() {

	//set height
	resizeContent();

	//attach on resize event
	$(window).resize(function() {
		resizeContent();
	});

	// fade in content on scroll
	var controller = $.superscrollorama({reverse: false});
	// individual element tween examples
	$('.project').each(function() {
		var $this = $(this);
		controller.addTween($this, TweenMax.from( $this.find('.desc'), 0.7, {css:{paddingTop: '70px', opacity: 0}, ease:Expo.easeOut}), 0, 100);
		controller.addTween($this, TweenMax.from( $this.find('.slides'), 0.7, {css:{opacity: 0}}), 0, 100);
	});

});


// bind view work link
$(function() {
	$('.view-work, .back a').bind('click',function(e){

		var $anchor = $(this);
		e.preventDefault();

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1000,'easeInOutExpo');

	});
});