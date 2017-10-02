var imgArray = ['couple-cooking.png',
    'meal.png',
    'present.png'
];

// var slideshow2ImgArray = ['meal.png'];

var textArray = ['#emotions',
    '#taste',
    '#surprise'
];

(function ($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function (partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);

function showText(counter) {
    var prevTextNum = (counter == 0) ? 2 : (counter - 1);
    $(textArray[prevTextNum]).fadeOut(1000, function () {
        $(textArray[counter]).fadeIn(1000);
    });
}

function changeImg(counter, firstSlideIsVisible) {
    var nextBG = "url(../SupperBox-LandingPage/images/" + imgArray[counter] + ")";
    var currentSlideId = firstSlideIsVisible ? '#slideshow' : '#slideshow2';
    var nextSlideId = firstSlideIsVisible ? '#slideshow2' : '#slideshow';

    $(currentSlideId).animate({opacity: 0}, 3000);
    $(nextSlideId).css("background-image", nextBG);
    $(nextSlideId).animate({opacity: 1}, 3000);
}

function playImgSlide() {
    var counter = 0;
    var nextBG = "url(../SupperBox-LandingPage/images/" + imgArray[counter] + ")";
    var firstSlideIsVisible = true;

    $('#slideshow').css("background-image", nextBG);
    $('#slideshow').animate({opacity: 1}, 3000);
    showText(counter);

    counter++;
    setInterval(function () {
        changeImg(counter,firstSlideIsVisible);
        showText(counter);
        firstSlideIsVisible = !firstSlideIsVisible;
        if (counter == 2) {
            counter = 0;
        } else {
            counter++;
        }
    }, 6000);
}

function setAnimationScroll() {
    var win = $(window);
    var allFadeIns = $(".fadeInOnView");
    var allLefts = $(".leftOnView");
    var allDeepLefts = $(".leftDeepOnView");
    var allRights = $(".rightOnView");
    var allDeepRights = $(".rightDeepOnView");

    // Already visible modules
//     allFadeIns.each(function(i, el) {
//         var el = $(el);
//         if (el.visible(true)) {
//             el.addClass("already-visible");
//         }
//     });

    win.scroll(function (event) {
        allFadeIns.each(function () {
            var el = $(this);
            if (el.visible(true)) {
                el.addClass("animateFadeIn");
            }
        });
        allLefts.each(function () {
            var el = $(this);
            if (el.visible(true)) {
                el.addClass("animateLeft");
            }
        });
        allRights.each(function () {
            var el = $(this);
            if (el.visible(true)) {
                el.addClass("animateRight");
            }
        });
        allDeepLefts.each(function () {
            var el = $(this);
            if (el.visible(true)) {
                el.addClass("animateDeepLeft");
            }
        });
        allDeepRights.each(function () {
            var el = $(this);
            if (el.visible(true)) {
                el.addClass("animateDeepRight");
            }
        });
    });
}

$(document).ready(function () {
    playImgSlide();
    setAnimationScroll();
});
