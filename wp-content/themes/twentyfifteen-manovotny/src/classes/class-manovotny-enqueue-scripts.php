<?php

class Manovotny_Enqueue_Scripts {

    /* Properties
    ---------------------------------------------------------------------------------- */

    /**
     * Instance of the class.
     *
     * @var Manovotny_Enqueue_Scripts
     */
    protected static $instance = null;

    /* Constructor
    ---------------------------------------------------------------------------------- */

    /**
     * Initialize class.
     */
    public function __construct() {

        add_action( 'wp_enqueue_scripts', array( $this, '__enqueue_scripts' ) );

    }

    /* Public
    ---------------------------------------------------------------------------------- */

    /**
     * Gets instance of class.
     *
     * @return Manovotny_Enqueue_Scripts Instance of the class.
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
     */
    public function __enqueue_scripts() {

        $manovotny = Manovotny::get_instance();
        $wp_enqueue_util = WP_Enqueue_Util::get_instance();

        $handle = $manovotny->get_slug() . '-scripts';
        $relative_path = __DIR__ . '/../site/js/';
        $filename = 'bundle.min.js';
        $filename_debug = 'bundle.concat.js';
        $dependencies = array();
        $version = $manovotny->get_version();

        $options = new WP_Enqueue_Options(
            $handle,
            $relative_path,
            $filename,
            $filename_debug,
            $dependencies,
            $version,
            true
        );

        $wp_enqueue_util->enqueue_script( $options );

    }

}
