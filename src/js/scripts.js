$(function () {
    var homeIn = function(){
        var $bg = $('.intro-bg');
        var white_line = $('.white-line');
        var into_h1 = $('.intro__h1-title');
        var into_info = $('.intro__intro-info');
        var about_columns = $('.wrap__content-right > div');
        var about_gallery = $('.wrap__gallery');
        var timeline = $('.timeline');

        TweenMax.to(white_line, 2, {
            height: '100vh',
            ease: Power4.easeOut,
            delay: .3
        });
        TweenMax.to(into_h1, 1.5, {
            y: -161,
            ease: Power4.easeInOut,
            delay: 1
        });
        TweenMax.to(into_info, 1, {
            x: -40,
            autoAlpha: 1,
            ease: Power4.easeInOut,
            delay: 1.2
        });
        TweenMax.to($bg, 2, {
            scale: 1,
            ease: Power2.easeOut,
            delay: 1.5
        });
    };


    var aboutIn = function(){
        var white_line = $('.white-line');
        var into_h1 = $('.intro__h1-title');
        var into_info = $('.intro__intro-info');
        var about_columns = $('.wrap__content-right > div');
        var about_gallery = $('.wrap__gallery');
        var timeline = $('.timeline');


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
            var white_line = $('.white-line');
            var into_h1 = $('.intro__h1-title');
            var into_info = $('.intro__intro-info');
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

                tl.to(white_line, 1, {
                    height: '0vh',
                })
                .to(into_h1, 1, {
                    y: 161,

                }, '-=.9')
                .to(into_info, 1, {
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
                                ease:Power4.easeOut
                            })
                    .staggerTo(about_columns, 1, {
                                    autoAlpha: 0,
                                    y: 50,
                                    ease:Power4.easeOut
                                }, '.2', '-=.3' )
                    .to(timeline, 1, {
                        autoAlpha: 0,
                        y: 40,
                         ease:Power4.easeOut

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
            $("nav ul").removeClass('navigation__menu_w');
            $("nav ul").addClass('navigation__menu');
        }

    });

    $(document).on('pageLoaded', function (e, $page) {
        var namespace = $page.data('namespace');

        if (namespace === 'homepage') {
            $("nav ul").removeClass('navigation__menu_w');
            $("nav ul").addClass('navigation__menu');
            
            homeIn();

        } else if (namespace === 'aboutpage') {
            $("nav ul").removeClass('navigation__menu');
            $("nav ul").addClass('navigation__menu_w');

            aboutIn();  
        }
    });

    $(document).trigger('pageLoaded', [$('.barba-container')]);

    Barba.Pjax.start();
});
