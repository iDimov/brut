$(function () {
   var white_line = $('.white-line');
   var into_h1 = $('.intro__h1-title');
   // var into_bg = $('.intro');
   var into_info = $('.intro__intro-info');
   var about_columns = $('.wrap__content-right > div');
   var about_gallery = $('.wrap__gallery');
   var timeline = $('.timeline');

   TweenMax.to(white_line, 2, { height: '100vh', ease: Power4.easeOut, delay: 1 });
   TweenMax.to(into_h1, 1.5, { y: -161, ease: Power4.easeInOut, delay: 1.3 });
   // TweenMax.to(into_bg, 2.5, {backgroundSize: '107%', ease:Power4.easeOut, delay: 2});
   TweenMax.to(into_info, 1, { x: -40, autoAlpha: 1, ease: Power4.easeInOut, delay: 1.6 });
   // TweenMax.to(about_gallery, 2, {autoAlpha: 1, width: '48%',  ease: Power4.easeInOut});
   
   var tl = new TimelineMax();
   tl
      .fromTo(about_gallery, 1, {autoAlpha: 0, width:0, x: '50%'}, {autoAlpha: 1, width: '48%', x: '0%'})
      .staggerFromTo(about_columns, 1, {autoAlpha: 0, y: 40}, {autoAlpha: 1, y: 0}, 0.4)
      .fromTo(timeline, 1, {autoAlpha: 0, y: 40}, {autoAlpha: 1, y: 0}, '-=1');

   Barba.Pjax.start();
   Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {

      var white_line = $('.white-line');
      var into_h1 = $('.intro__h1-title');
      // var into_bg = $('.intro');
      var into_info = $('.intro__intro-info');
      var about_columns = $('.wrap__content-right > div');
      var about_gallery = $('.wrap__gallery');
      var timeline = $('.timeline');

      TweenMax.to(white_line, 2, { height: '100vh', ease: Power4.easeOut, delay: 1 });
      TweenMax.to(into_h1, 1.5, { y: -161, ease: Power4.easeInOut, delay: 1.3 });
      TweenMax.to(into_info, 1, { x: -40, autoAlpha: 1, ease: Power4.easeInOut, delay: 1.6 });
      
   var tl = new TimelineMax();
   tl
      .fromTo(about_gallery, 1, {autoAlpha: 0, width:0, x: '50%'}, {autoAlpha: 1, width: '48%', x: '0%'})
      .staggerFromTo(about_columns, 1, {autoAlpha: 0, y: 40}, {autoAlpha: 1, y: 0}, 0.4)
      .fromTo(timeline, 1, {autoAlpha: 0, y: 40}, {autoAlpha: 1, y: 0}, '-=1');
   });

var Homepage = Barba.BaseView.extend({
  namespace: 'homepage',
  onEnter: function() {
      $("nav ul").removeClass('menu-w');
      $("nav ul").addClass('menu');
  },
  onEnterCompleted: function() {
   console.log('привет');
  },
  onLeave: function() {
  },
  onLeaveCompleted: function() {
  }
});

Homepage.init();

var Aboutpage = Barba.BaseView.extend({
  namespace: 'aboutpage',
  onEnter: function() {
      $("nav ul").removeClass('menu');
      $("nav ul").addClass('menu-w');
  },
  onEnterCompleted: function() {
   console.log('привет');
  },
  onLeave: function() {
  },
  onLeaveCompleted: function() {
  }
});

Aboutpage.init();

});