<?php

class Manovotny {

    /* Properties
    ---------------------------------------------------------------------------------- */

    /**
     * Instance of the class.
     *
     * @var Manovotny
     */
    protected static $instance = null;


    /**
     * Recipe slug.
     *
     * @var string
     */
    protected $slug = 'manovotny';

    /**
     * Plugin version, used for cache-busting of style and script file references.
     *
     * @var string
     */
    protected $version = '1.0.0';

    /* Public
    ---------------------------------------------------------------------------------- */

    /**
     * Gets instance of class.
     *
     * @return Manovotny Instance of the class.
     */
    public static function get_instance() {

        if ( null == self::$instance ) {

            self::$instance = new self;

        }

        return self::$instance;

    }

    /**
     * Gets slug.
     *
     * @return string Slug.
     */
    public function get_slug() {

        return $this->slug;

    }

    /**
     * Gets version.
     *
     * @return string Version.
     */
    public function get_version() {

        return $this->version;

    }

}
