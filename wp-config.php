<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'manovotny_com');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '7Q&e>|i}GjJrE?-DT2UR0Ll@R#NjWHhfwm^@!`nje4Or:K:q qne{_>VQlu12b-3');
define('SECURE_AUTH_KEY',  '3^zrhYiV07+?58*~<_`kSka fK?FcVtZQ9c,S+Gx7K49uZ~y9!AR).*^)=#d=]6T');
define('LOGGED_IN_KEY',    'wH3i--C`2%?dl#wdX41|yovRj+z-Z>oB/z#ct*Kmb)zCSD0*h(4~B/>|vrnm6`Gg');
define('NONCE_KEY',        '`LR{Ni>eoxCJ|1(|7LTAr5ePbOU}un:}f;3})=L!6ajfAfQ(<+,UjU{f5sBW}+/D');
define('AUTH_SALT',        ',|+,V5T-?6a*w3C-jnF1)_|$/][]zH%Hj54o0[=Av=G9VdLunLOEI.5dGTkM%KZ8');
define('SECURE_AUTH_SALT', '[ox!],V#G;p~:Zi+WTX!f(([Tz: !o]kUdF]/.*_m/A-nFL3n5xv9|9~}WgP,.x{');
define('LOGGED_IN_SALT',   '61fE2}|)^kg1|)QqlZTFYfW-0&Q-9*|4r4(+kQ~ A_0r2|AOVL.NFt7Hjpl}/Cme');
define('NONCE_SALT',       '{g4NLu1X9]5681t&wMl=[GuUKz]Ts0wLV|+-$t&W&7$<2*!`-:y^)n<$|&FC1?0O');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_man_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
