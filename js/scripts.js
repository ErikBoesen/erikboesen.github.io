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

var isMenuOpen = false;

var menuOpen = function() {
    $('nav').stop();
    $('nav').animate({
        left: '0px'
    }, 300);
    $('.menu-button').animate({
        left: '-20px'
    }, 200);

    isMenuOpen = true;
};
var menuClose = function() {
    $('nav').stop();
    $('nav').animate({
        left: '-1000px'
    }, 300);
    $('.menu-button').animate({
        left: '10px'
    }, 200);

    isMenuOpen = false;
};
var menu = function() {
    $('.menu-button').click(function() {
        if (isMenuOpen === false) {
            menuOpen();
        } else {
            menuClose();
        }
    });
};

addEventListener('load', menu);

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