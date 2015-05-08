<?php

class Manovotny_Enqueue_Styles {

    /* Properties
    ---------------------------------------------------------------------------------- */

    /**
     * Instance of the class.
     *
     * @var Manovotny_Enqueue_Styles
     */
    protected static $instance = null;

    /* Constructor
    ---------------------------------------------------------------------------------- */

    /**
     * Initialize class.
     */
    public function __construct() {

        add_action( 'wp_enqueue_scripts', array( $this, '__enqueue_styles' ) );

    }

    /* Public
    ---------------------------------------------------------------------------------- */

    /**
     * Gets instance of class.
     *
     * @return Manovotny_Enqueue_Styles Instance of the class.
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
     * Enqueues styles.
     */
    public function __enqueue_styles() {

        $this->enqueue_parent_theme_styles();
        $this->enqueue_child_theme_styles();

    }

    private function enqueue_child_theme_styles() {

        $wp_enqueue_util = WP_Enqueue_Util::get_instance();
        $manovotny = Manovotny::get_instance();

        $handle = $manovotny->get_slug() . '-styles';
        $relative_path = __DIR__ . '/../site/css/';
        $filename = 'theme.min.css';
        $filename_debug = 'theme.css';
        $dependencies = array(
            $manovotny->get_slug() . '-parent-theme-styles'
        );
        $version = $manovotny->get_version();

        $options = new WP_Enqueue_Options(
            $handle,
            $relative_path,
            $filename,
            $filename_debug,
            $dependencies,
            $version
        );

        $wp_enqueue_util->enqueue_style( $options );

    }

    private function enqueue_parent_theme_styles() {

        $wp_enqueue_util = WP_Enqueue_Util::get_instance();
        $manovotny = Manovotny::get_instance();

        $handle = $manovotny->get_slug() . '-parent-theme-styles';
        $relative_path = trailingslashit( get_template_directory() );
        $filename = 'style.css';
        $filename_debug = 'style.css';
        $dependencies = array();
        $version = $manovotny->get_version();

        $options = new WP_Enqueue_Options(
            $handle,
            $relative_path,
            $filename,
            $filename_debug,
            $dependencies,
            $version
        );

        $wp_enqueue_util->enqueue_style( $options );

    }

}
