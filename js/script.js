// Globals
var $window = $(window);

// Initialize Foundation plugins
$(document).foundation();


// Highlight active section and scroll animation
var $sectionNav = $('.section-nav');

$sectionNav.click(function(event) {
	// Stop the default link navigation
	// Must leave the href for magellan however
	event.preventDefault();

	$sectionNav.not(this).css('font-weight', 'normal');
	$(this).css('font-weight', 'bold');
	$('html, body').animate({
		scrollTop: $('#' + $(this).text().toLowerCase()).offset().top - 20 // Adjust for Top Bar
	}, 500);
});


// Scroll Loading Bar Event
// Modeled after tutorial on https://www.sitepoint.com/scroll-based-animations-jquery-css3/
var $progress = $('.progress-meter');

$window.on('scroll', checkViewForProgress);
$window.on('scroll resize', checkViewForProgress);
// trigger on page load
$window.trigger('scroll');

function checkViewForProgress() {
	$.each($progress, function() {
		var $element = $(this);

		var width;

		if ($element.hasClass('beginner')) {
			width = '20%';
		} else if ($element.hasClass('novice')) {
			width = '40%';
		} else if ($element.hasClass('intermediate')) {
			width = '60%';
		} else if ($element.hasClass('expert')) {
			width = '80%';
		} else if ($element.hasClass('master')) {
			width = '100%';
		} else {
			width = '0%';
		}

		if (inView($element)) {
			$element.animate({
				width: width
			}, 1500);
		}
	});
}


// Project Container Event
// Modeled after tutorial on https://www.sitepoint.com/scroll-based-animations-jquery-css3/
var $project = $('.project-container');

$window.on('scroll', checkViewForProject);
$window.on('scroll resize', checkViewForProject);
// trigger on page load
$window.trigger('scroll');

function checkViewForProject() {
	$.each($project, function() {
		var $element = $(this);

		if (inView($element)) {
			$element.addClass('animated slideInUp');
		}
	});
}

// Function to check if elements are in window view
function inView(elem) {
	var winHeight = $window.height();
	var winTop = $window.scrollTop();
	var winBottom = winHeight + winTop;

	var elemHeight = elem.outerHeight();
	var elemTop = elem.offset().top;
	var elemBottom = elemHeight + elemTop;

	return ((elemBottom >= winTop) && (elemTop <= winBottom)) &&
		(elemTop >= winTop) && (elemBottom <= winBottom)
}


// Hover overlay for project-container class
$('.project-container').on('mouseenter', function() {
	$(this).find('.overlay').slideDown('fast');
});

$('.project-container').on('mouseleave', function() {
	$(this).find('.overlay').slideUp('fast');
});