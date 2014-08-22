(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function (global) {

    'use strict';

    require('./google-analytics-tracking-code');

    var options = require('./google-analytics-options');

    // Google Analytics settings.
    global.ga( 'create', options.trackingId, 'auto' );
    global.ga( 'send', 'pageview' );

}(global));
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./google-analytics-options":2,"./google-analytics-tracking-code":3}],2:[function(require,module,exports){
(function (global){
(function (global) {

    'use strict';

    var trackingId = global.wp_google_analytics.options.trackingId;

    module.exports = {
        trackingId: trackingId
    };

}(global));
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
/* jshint ignore:start */

// Code Google Analytics gives you to add to your page.
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

/* jshint ignore:end */
},{}]},{},[1,2,3]);