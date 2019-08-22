
"use strict";

/* Video Resize */
var video = document.getElementById('video');
// document.getElementById('video').play();
// console.log($window);
// console.log(window.innerWidth);
// window.innerHeight

window.addEventListener("resize", onVideoResize);

function onVideoResize() {
    // console.log(window.innerWidth);
    // video.style.cssText = window.innerWidth;
    // video.style.cssText = 'width:'+ window.innerWidth + 'px !important; height: '+ window.innerHeight + 'px !important;';
    // video.style.height = window.innerHeight;
}

/**
 * ------------ Slider ----------
 */

var testimContent = Array.prototype.slice.call(
    document.getElementById("slider").children
),
    testimSpeed = 3000,
    currentSlide = 0,
    currentActive = 0,
    testimTimer;

window.onload = function () {
    function playSlide(slide) {
        for (var k = 0; k < testimContent.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");
        }
        testimContent[slide].classList.add("active");
        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function () {
            playSlide((currentSlide += 1));
        }, testimSpeed);
    }
    playSlide(currentSlide);
};


/* Sound wave */
var audioOff = document.getElementById("audioOff");
audioOff.addEventListener("click", function () {
    console.log('asfadf');
    
    if (audioOff.classList.contains("audio-on")) {
        audioOff.classList.remove("audio-on");
    } else {
        audioOff.classList.add("audio-on");
    }
});