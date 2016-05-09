// Define page elements
var e = {
	email: document.getElementById('email'),
	down: document.getElementById('down'),
	sections: {
		bwnt: document.getElementById('bwnt')
	},
	clock: document.getElementById('clock'),
	clockSection: document.getElementById('clockSection'),
	gyro: {
		arm: document.getElementById('gyroArm'),
	}
};

// Makes email address invisible to email crawlers
e.email.onclick = function() {
	window.open('mailto:' + 'me' + '@erik' + 'boesen.com');
};

// Function to scroll down a section
e.down.onclick = function() {
    // Stop scrolling if it's already going on to prevent glitchiness
    clearInterval(scroll);
    // Get current section
	var prevSection = window.innerHeight * Math.floor(document.body.scrollTop / window.innerHeight);
    // Scroll down tiny amounts at interval of 1ms for smooth scrolling effect
	var scroll = setInterval(function() {
        // Scroll down 8 pixels
		document.body.scrollTop += 8;
        // If it's scrolled to or past 1 section above the previous one, or it's reached the bottom/a border between two sections, end scrolling
		if (window.innerHeight * Math.floor(document.body.scrollTop / window.innerHeight) - 1 >= prevSection || document.body.scrollTop % window.innerHeight === 0) {
            // Stop animation
			clearInterval(scroll);
            // Go to exactly the target section in case scrolling overshot
			document.body.scrollTop = prevSection + window.innerHeight;
		}
	}, 1);
};

// Hide button when at bottom of page and show it if not
window.onscroll = function() {
	if (document.documentElement.scrollHeight === document.body.scrollTop + window.innerHeight) {
		e.down.style.opacity = 0;
	} else {
		e.down.style.opacity = 1;
	}
};

m = 0;
h = 24;
angle = 0;
// This section manages the clock portion of the pageview
setInterval(function() {
	m++;
	if (m === 60) {
		m = 0;
		h++;
		if (h === 25) {
			h = 1;
		}
	}
	if (h >= 6 && h <= 20) {
		e.sections.bwnt.className = 'light';
	} else {
		e.sections.bwnt.className = 'night';
	}
	var vh;
	if (h > 12) {
		vh = h - 12;
	} else {
		vh = h;
	}
	if (m < 10) {
		m = '0' + m;
	}
	e.clock.innerHTML = vh + ':' + m;
	angle++;
	if (angle === 360) angle = 0;
	e.gyro.arm.style.transform = 'rotate(' + angle + 'deg)';
}, 10);

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44442416-1', 'auto');
ga('send', 'pageview');