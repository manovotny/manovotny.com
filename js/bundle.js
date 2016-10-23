(function () {
    var resizeDelay = 250,
        resizeDelayTimeout;

    function determineFooterPosition() {
        var body = document.getElementsByTagName('body')[0],
            footer = document.getElementsByTagName('footer')[0];

        if (body.offsetHeight < window.innerHeight) {
            footer.classList.add('sticky');
        } else {
            footer.classList.remove('sticky');
        }
    }

    window.addEventListener('resize', function () {
        clearTimeout(resizeDelayTimeout);

        resizeDelayTimeout = setTimeout(function () {
            determineFooterPosition();
        }, resizeDelay);
    });

    determineFooterPosition();
})();
