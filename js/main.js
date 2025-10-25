/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            FIlter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.filter__gallery').length > 0) {
            var containerEl = document.querySelector('.filter__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var $element = $(this);
        if ($element.data('bgManaged')) {
            return;
        }
        var bg = $element.data('setbg');
        if (bg) {
            $element.css('background-image', 'url(' + bg + ')');
        }
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Hero Slider
	--------------------*/
    var hero_s = $(".hero__slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        nav: true,
        navText: ["<span class='arrow_carrot-left'></span>", "<span class='arrow_carrot-right'></span>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------
        Video Player
    --------------------*/
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'fullscreen'],
        seekTime: 25
    });

    /*------------------
        Niceselect
    --------------------*/
    $('select').filter(function () {
        return !$(this).is('[data-plain-select]');
    }).niceSelect();

    /*------------------
        Scroll To Top
    --------------------*/
    $("#scrollToTopButton").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
     });

    $(".hero__scroll").on('click', function(event) {
        const targetSelector = $(this).attr('href');
        const $target = $(targetSelector);
        if ($target.length) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: $target.offset().top - 40 }, "slow");
        }
    });

    const $floatingScrollTop = $('[data-scroll-top]');
    if ($floatingScrollTop.length) {
        const toggleFloatingScrollTop = () => {
            const midpoint = $(window).height() * 0.5;
            if ($(window).scrollTop() > midpoint) {
                $floatingScrollTop.addClass('is-visible');
            } else {
                $floatingScrollTop.removeClass('is-visible');
            }
        };

        $floatingScrollTop.on('click', function (event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        $(window).on('scroll', toggleFloatingScrollTop);
        toggleFloatingScrollTop();
    }

})(jQuery);
