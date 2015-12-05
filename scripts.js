!function(n){var t={strength:25,scale:1.05,animationSpeed:"100ms",contain:!0,wrapContent:!1};n.fn.interactive_bg=function(i){return this.each(function(){function a(){var n=Math.round(10*event.gamma)/10,t=Math.round(10*event.beta)/10,i=-(n/10)*e.strength,a=-(t/10)*e.strength,s=-(i/10),o=-(a/10);r.find("> .ibg-bg").css({"-webkit-transform":"matrix("+e.scale+",0,0,"+e.scale+","+s+","+o+")","-moz-transform":"matrix("+e.scale+",0,0,"+e.scale+","+s+","+o+")","-o-transform":"matrix("+e.scale+",0,0,"+e.scale+","+s+","+o+")",transform:"matrix("+e.scale+",0,0,"+e.scale+","+s+","+o+")"})}var e=n.extend({},t,i),r=n(this),s=r.outerHeight(),o=r.outerWidth(),m=e.strength/s,c=e.strength/o,d="ontouchstart"in document.documentElement;1==e.contain&&r.css({overflow:"hidden"}),0==e.wrapContent?r.prepend("<div class='ibg-bg'></div>"):r.wrapInner("<div class='ibg-bg'></div>"),void 0!==r.data("ibg-bg")&&r.find("> .ibg-bg").css({background:"url('"+r.data("ibg-bg")+"') no-repeat center center","background-size":"cover"}),r.find("> .ibg-bg").css({width:o,height:s}),d||screen.width<=699?window.addEventListener("deviceorientation",a,!0):n("body").mouseenter(function(){1!=e.scale&&r.addClass("ibg-entering"),r.find("> .ibg-bg").css({"-webkit-transform":"matrix("+e.scale+",0,0,"+e.scale+",0,0)","-moz-transform":"matrix("+e.scale+",0,0,"+e.scale+",0,0)","-o-transform":"matrix("+e.scale+",0,0,"+e.scale+",0,0)",transform:"matrix("+e.scale+",0,0,"+e.scale+",0,0)","-webkit-transition":"-webkit-transform "+e.animationSpeed+" linear","-moz-transition":"-moz-transform "+e.animationSpeed+" linear","-o-transition":"-o-transform "+e.animationSpeed+" linear",transition:"transform "+e.animationSpeed+" linear"}).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.removeClass("ibg-entering")})}).mousemove(function(n){if(!r.hasClass("ibg-entering")&&!r.hasClass("exiting")){var t=n.pageX||n.clientX,i=n.pageY||n.clientY,t=t-r.offset().left-o/2,i=i-r.offset().top-s/2,a=c*t*-1,d=m*i*-1;r.find("> .ibg-bg").css({"-webkit-transform":"matrix("+e.scale+",0,0,"+e.scale+","+a+","+d+")","-moz-transform":"matrix("+e.scale+",0,0,"+e.scale+","+a+","+d+")","-o-transform":"matrix("+e.scale+",0,0,"+e.scale+","+a+","+d+")",transform:"matrix("+e.scale+",0,0,"+e.scale+","+a+","+d+")","-webkit-transition":"none","-moz-transition":"none","-o-transition":"none",transition:"none"})}}).mouseleave(function(){1!=e.scale&&r.addClass("ibg-exiting"),r.addClass("ibg-exiting").find("> .ibg-bg").css({"-webkit-transform":"matrix(1,0,0,1,0,0)","-moz-transform":"matrix(1,0,0,1,0,0)","-o-transform":"matrix(1,0,0,1,0,0)",transform:"matrix(1,0,0,1,0,0)","-webkit-transition":"-webkit-transform "+e.animationSpeed+" linear","-moz-transition":"-moz-transform "+e.animationSpeed+" linear","-o-transition":"-o-transform "+e.animationSpeed+" linear",transition:"transform "+e.animationSpeed+" linear"}).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.removeClass("ibg-exiting")})})})}}(window.jQuery);

$('.bg').interactive_bg({
   strength: 25,
   scale: 1.05,
   animationSpeed: "100ms",
   contain: true,
   wrapContent: false
 });

var emailMe = function() {
    window.open('mailto:erikboesen@erikboesen.com');
};

if(document.location.protocol=='http:'){
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-44442416-1', 'auto');
      ga('send', 'pageview');
}
