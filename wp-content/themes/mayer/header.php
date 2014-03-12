<?php
/**
 * The template for displaying the header.
 *
 * Displays all of the <head> section, `wp_title`, `wp_head`, the navigation
 * and everything up to div#content.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><?php wp_title( '|', true, 'right' ); ?></title>
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
		<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?>>

		<div id="top-navigation-wrapper">
			<div class="container navigation">
				<div class="col-lg-8 col-md-8">
					<button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
						<span class="sr-only"><?php _e( 'Toggle Navigation', 'mayer' ); ?></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button><!-- .navbar-toggle -->
					<?php get_template_part( 'partials/navigation' ); ?>
				</div><!-- .col-lg-12 -->
				<div class="col-lg-4 col-md-4 hidden-sm hidden-xs pull-right">
					<div class="container pull-right">
						<ul id="social-icons" class="list-inline nav nav-pills pull-right">

							<?php $visibility = ( '' === trim( get_theme_mod( 'mayer_email_address' ) ) ) ? 'hidden' : '' ?>
							<li id="email" class="<?php echo $visibility; ?>">
								<a href="mailto:<?php echo esc_attr( get_theme_mod( 'mayer_email_address' ) ); ?>" title="Email">
									<i class="fa fa-envelope fa-stack-1x"></i>
								</a>
							</li><!-- #mail -->

							<?php $visibility = ( '' === trim( get_theme_mod( 'mayer_twitter_username' ) ) ) ? 'hidden' : '' ?>
							<li id="twitter" class="<?php echo $visibility; ?>">
								<a href="<?php echo esc_url( 'http://twitter.com/' . get_theme_mod( 'mayer_twitter_username' ) ); ?>/" title="Twitter">
									<i class="fa fa-twitter fa-stack-1x"></i>
								</a>
							</li><!-- #twitter -->

							<?php $visibility = ( '' === trim( get_theme_mod( 'mayer_facebook_url' ) ) ) ? 'hidden' : '' ?>
							<li id="facebook" class="<?php echo $visibility; ?>">
								<a href="<?php echo esc_url( get_theme_mod( 'mayer_facebook_url' ) ); ?>" title="Facebook">
									<i class="fa fa-facebook fa-stack-1x"></i>
								</a>
							</li><!-- #facebook -->

							<?php $visibility = ( '' === trim( get_theme_mod( 'mayer_pinterest_url' ) ) ) ? 'hidden' : '' ?>
							<li id="pinterest" class="<?php echo $visibility; ?>">
								<a href="<?php echo esc_url( get_theme_mod( 'mayer_pinterest_url' ) ); ?>" title="Pinterest">
									<i class="fa fa-pinterest fa-stack-1x"></i>
								</a>
							</li><!-- #google-plus -->

							<?php $visibility = ( '' === trim( get_theme_mod( 'mayer_googleplus_url' ) ) ) ? 'hidden' : '' ?>
							<li id="google-plus" class="<?php echo $visibility; ?>">
								<a href="<?php echo esc_url( get_theme_mod( 'mayer_googleplus_url' ) ); ?>?rel=author" title="Google Plus">
									<i class="fa fa-google-plus fa-stack-1x"></i>
								</a>
							</li><!-- #google-plus -->

						</ul><!-- #social-icons -->
					</div><!-- .container -->
				</div><!-- .col-lg-3 -->
			</div><!-- .navigation -->
		</div><!-- /#top-navigation-wrapper -->

		<header id="masthead" role="banner">
			<div class="container">
				<?php if ( is_rtl() ) { ?>
					<?php get_template_part( 'partials/title' ); ?>
					<?php get_template_part( 'partials/avatar' ); ?>
				<?php } else { ?>
					<?php get_template_part( 'partials/avatar' ); ?>
					<?php get_template_part( 'partials/title' ); ?>
				<?php } // end if/else ?>
			</div><!-- .container -->
		</header><!-- #masthead -->