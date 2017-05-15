$(function () {
      var homeIn = function () {
            var $bg = $('.intro-bg');
            var $white_line = $('.white-line');
            var $into_h1 = $('.intro__h1-title');
            var $into_info = $('.intro__intro-info');
            var $navigationMenu = $('.navigation');

            var tlHome = new TimelineMax();

            tlHome
                  .to($white_line, 1.3, {
                        height: '100vh',
                        ease: Power4.easeOut,
                        delay: .1
                  })
                  .to($into_h1, 1.3, {
                        y: -161,
                        ease: Power4.easeInOut,
                  }, '-=.3')
                  .to($into_info, 1.1, {
                        x: -50,
                        autoAlpha: 1,
                        ease: Power4.easeInOut,
                  }, '-=.5')
                  .to($navigationMenu, 1.1, {
                        x: -60,
                        autoAlpha: 1,
                        ease: Power3.easeInOut
                  }, '-=1.1')
                  .to($bg, 5, {
                        scale: 1,
                        ease: Power2.easeOut
                  }, '-=1.4');
      };

      var aboutIn = function () {
            var about_columns = $('.wrap__content-right > div');
            var about_gallery = $('.wrap__gallery');
            var timeline = $('.timeline');
            var $navigationMenu = $('.navigation');
            var tl2 = new TimelineMax();

            tl2
                  .fromTo(about_gallery, 1, {
                        autoAlpha: 0,
                        width: 0,
                        x: '50%'
                  }, {
                        autoAlpha: 1,
                        width: '48%',
                        x: '0%'
                  })
                  .staggerFromTo(about_columns, 1, {
                        autoAlpha: 0,
                        y: 40
                  }, {
                        autoAlpha: 1,
                        y: 0
                  }, 0.4)
                  .to($navigationMenu, 1.1, {
                        x: -60,
                        autoAlpha: 1,
                        ease: Power3.easeInOut
                  }, '-=1.1')
                  .to(timeline, 1, {
                        autoAlpha: 1,
                        y: -60
                  }, '-=1');
      };

      homeIn();
      aboutIn();

      var FadeTransition = Barba.BaseTransition.extend({

            start: function () {
                  this.newContainerLoading.then(this.display.bind(this));
            },

            display: function () {
                  var _this = this;
                  var $newContainer = $(this.newContainer);
                  var $oldContainer = $(this.oldContainer);
                  var $white_line = $('.white-line');
                  var $into_h1 = $('.intro__h1-title');
                  var $into_info = $('.intro__intro-info');
                  var about_columns = $('.wrap__content-right > div');
                  var about_gallery = $('.wrap__gallery');
                  var timeline = $('.timeline');
                  var namespaceOld = $oldContainer.data('namespace');

                  $(document).trigger('pageLoading', [$newContainer]);

                  var tl = new TimelineMax({
                        onComplete: function () {
                              $oldContainer.hide('slow');
                              _this.done();
                              $(document).trigger('pageLoaded', [$newContainer]);
                        }
                  });
                  if (namespaceOld === 'homepage') {

                        tl.to($white_line, 1, {
                              height: '0vh',
                        })
                              .to($into_h1, 1, {
                                    y: 161,

                              }, '-=.9')
                              .to($into_info, 1, {
                                    x: 40,
                                    autoAlpha: 0
                              }, '-=.9')
                              .to($oldContainer, .5, { autoAlpha: 0 })
                              .fromTo($newContainer, .5, { autoAlpha: 0 }, { autoAlpha: 1 });
                  } else if (namespaceOld === 'aboutpage') {
                        tl
                              .to(about_gallery, .5, {
                                    autoAlpha: 0,
                                    width: 0,
                                    x: '0%',
                                    ease: Power4.easeOut
                              })
                              .staggerTo(about_columns, 1, {
                                    autoAlpha: 0,
                                    y: 50,
                                    ease: Power4.easeOut
                              }, '.2', '-=.3')
                              .to(timeline, 1, {
                                    autoAlpha: 0,
                                    y: 40,
                                    ease: Power4.easeOut

                              }, '-=1')
                              .to($oldContainer, .5, { autoAlpha: 0 })
                              .fromTo($newContainer, .5, { autoAlpha: 0 }, { autoAlpha: 1 });
                  }
            }
      });

      Barba.Pjax.getTransition = function () {
            return FadeTransition;
      };


      $(document).on('pageLoading', function (e, $page) {
            var namespace = $page.data('namespace');
            if (namespace === 'homepage') {
                  $(".menu-item").removeClass('active');
                  $("nav ul").removeClass('navigation__menu_w');
                  $("nav ul").addClass('navigation__menu');
                  $(".menu-item:contains('Main')").addClass('active');
            }
      });

      $(document).on('pageLoaded', function (e, $page) {
            var namespace = $page.data('namespace');

            if (namespace === 'homepage') {
                  $("nav ul").hide();
                  $("nav ul").removeClass('navigation__menu_w');
                  $("nav ul").addClass('navigation__menu');
                  $("nav ul").show();
                  homeIn();
            } else if (namespace === 'aboutpage') {
                  $("nav ul").hide();
                  $("nav ul").removeClass('navigation__menu');
                  $("nav ul").addClass('navigation__menu_w');
                  $(".menu-item:contains('About')").addClass('active');
                  $("nav ul").show();
                  aboutIn();
            }
      });

      $(document).trigger('pageLoaded', [$('.barba-container')]);

      Barba.Pjax.start();
});
