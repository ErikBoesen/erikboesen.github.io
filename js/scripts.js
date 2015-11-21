$(window).scroll(function() {
    // Parallax effects
    var wScroll = $(window).scrollTop();
    $('.bg').css({
        'transform': 'translate(0,-' + wScroll / 2 + 'px)'
    });
    $('header').css({
        'transform': 'translate(0,' + wScroll * 0.65 + 'px)'
    });
});

$(document).ready(function() {
    var isMenuOpen = false;
	$('.menu-button').click(function(){
		$(this).toggleClass('open');
        if (isMenuOpen) {
            $('nav').stop();
            $('nav').animate({
                'left': '-200px'
            }, 300);
            isMenuOpen = false;
        }
        else {
            $('nav').stop();
            $('nav').animate({
                'left': '0'
            }, 300);
            isMenuOpen = true;
        }
	});
});

// Email address mask
var emailMe = function() {
    window.open('mailto:erikboesen@erikboesen.com');
};

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44442416-1', 'auto');
ga('send', 'pageview');
