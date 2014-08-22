(function (global) {

    'use strict';

    require('./google-analytics-tracking-code');

    var options = require('./google-analytics-options');

    // Google Analytics settings.
    global.ga( 'create', options.trackingId, 'auto' );
    global.ga( 'send', 'pageview' );

}(global));