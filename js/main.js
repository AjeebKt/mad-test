

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