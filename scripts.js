var emailMe = function() {
    window.open('mailto:me@erikboesen.com');
};

if(document.location.protocol=='http:'){
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-44442416-1', 'auto');
      ga('send', 'pageview');
}

var angle = 0;
var c = [
    [0, 136, 122],
    [86, 199, 201]
];
setInterval(function() {
    document.body.style.background = 'linear-gradient(' + angle + 'deg, rgb(' + c[0][0] + ',' + c[0][1] + ',' + c[0][2] + '), rgb(' + c[1][0] + ',' + c[1][1] + ',' + c[1][2] + ')';
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 3; j++) {
            c[i][j] = c[i][j] + (Math.ceil(Math.random() * 41) - 21);
            console.log(Math.ceil(Math.random() * 41) - 21);
        }
    }
    angle++;
}, 1);