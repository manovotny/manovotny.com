<?php

class Manovotny_Grunticon {

    /* Properties
    ---------------------------------------------------------------------------------- */

    /**
     * Instance of the class.
     *
     * @var Manovotny_Grunticon
     */
    protected static $instance = null;

    /* Constructor
    ---------------------------------------------------------------------------------- */

    /**
     * Initialize class.
     */
    public function __construct() {

        add_filter( 'wp_grunticon_enqueue_scripts', array( $this, '__enqueue_scripts' ) );

    }

    /* Public
    ---------------------------------------------------------------------------------- */

    /**
     * Gets instance of class.
     *
     * @return Manovotny_Grunticon Instance of the class.
     */
    public static function get_instance() {

        if ( null == self::$instance ) {

            self::$instance = new self;

        }

        return self::$instance;

    }

    /* Private
    ---------------------------------------------------------------------------------- */

    /**
     * Enqueues scripts.
     *
     * @param $queue array List of enqueued Grunticon assets.
     * @return array Filtered list of enqueued Grunticon assets.
     */
    function __enqueue_scripts( $queue ) {

        $manovotny = Manovotny::get_instance();
        $wp_url_util = WP_Url_Util::get_instance();

        $wp_grunticon_options = new WP_Grunticon_Options(
            $wp_url_util->convert_absolute_path_to_root_path( realpath( __DIR__ . '/../site/css/images' ) ),
            'svg.css',
            'png.css',
            'fallback.css',
            $manovotny->get_version()
        );

        array_push( $queue, $wp_grunticon_options );

        return $queue;

    }

}
