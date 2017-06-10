<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'u402759730_vasuq');

/** MySQL database username */
define('DB_USER', 'u402759730_sagez');

/** MySQL database password */
define('DB_PASSWORD', 'veDubapeTu');

/** MySQL hostname */
define('DB_HOST', 'mysql');

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
define('AUTH_KEY',         'BWqj0FJbxRLkq95G9NybXKbkbHWL9sv3Ln8hK3sY1kDheahKZHzZOsqq5sdMBnp4');
define('SECURE_AUTH_KEY',  'kXu8kmS4q4K5g2hmqHd0sDqzx7inGj1a1oGZZuPyCMRScf52BCCPSxartUR1U0l3');
define('LOGGED_IN_KEY',    'o67s88gZEVYkUNOg4B22yYrlo6WweB1feCLyN74l6uz9R0XnofEMWG4sunRWyDdG');
define('NONCE_KEY',        'szrKIsIzPAnxPknF6tIGssmAHyW85KIVMvSNyhP77QxuSP1OyIyWgo2VIAgLSu90');
define('AUTH_SALT',        'kqYiMy8yfxEhVmaIpQ9cOrQyTJxZTIq6nGLriIJ7XcW3cHEVMgpTEKm6wcFOqUCH');
define('SECURE_AUTH_SALT', '8Wh0qTUVZ6dTGN2oiV3b4C9CQjOHQ2EXftB1KnfkC6UWPEOqqYiWpD5I6iaDVoUC');
define('LOGGED_IN_SALT',   'cRs8NSVxwUx7CDbSVcTmASqaUXCWsGVZvnEKCADHEf7a6OGI3x2TE8Io1k6x2gdN');
define('NONCE_SALT',       'KWNqxajfn0YkvFlLonhb3iszeQrTasmi53aeZAREaJwiDaWs6mXBmCZnQeO6FA6z');

/**
 * Other customizations.
 */
define('FS_METHOD','direct');define('FS_CHMOD_DIR',0755);define('FS_CHMOD_FILE',0644);
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');

/**
 * Turn off automatic updates since these are managed upstream.
 */
define('AUTOMATIC_UPDATER_DISABLED', true);


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'yxkp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
