<!DOCTYPE html>
<!--[if IE 8 ]><html id="ie8" <?php language_attributes(); ?>><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html <?php language_attributes(); ?>><!--<![endif]-->
	<head>	
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		
		<link rel="profile" href="http://gmpg.org/xfn/11" />
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
		<title><?php wp_title( '' ); ?></title>
		<?php $presentation_options = get_option( 'standard_theme_presentation_options'); ?>
		<?php if( '' != $presentation_options['fav_icon'] ) { ?>
			<link rel="shortcut icon" href="<?php echo $presentation_options['fav_icon']; ?>" />
			<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $presentation_options['fav_icon']; ?>" />
		<?php } // end if ?>
		<?php global $post; ?>
		<?php if( standard_using_native_seo() && ( ( is_single() || is_page() ) && ( 0 != strlen( trim( ( $google_plus = get_user_meta( $post->post_author, 'google_plus', true ) ) ) ) ) ) ) { ?>
			<?php if( false != standard_is_gplusto_url( $google_plus ) ) { ?>
				<?php $google_plus = standard_get_google_plus_from_gplus( $google_plus ); ?>
			<?php } // end if ?>
			<link rel="author" href="<?php echo trailingslashit( $google_plus ); ?>"/>
		<?php } // end if ?>
		<?php $global_options = get_option( 'standard_theme_global_options' ); ?>
		<?php if( '' != $global_options['google_analytics'] ) { ?>
			<?php if( is_user_logged_in() ) { ?>
				<!-- Google Analytics is restricted only to users who are not logged in. -->
			<?php } else { ?>
				<script type="text/javascript">
					var _gaq = _gaq || [];
					_gaq.push(['_setAccount', '<?php echo $global_options[ 'google_analytics' ] ?>']);
					_gaq.push(['_trackPageview']);
		
					(function() {
						var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
						ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
						var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
					})();
				</script>
			<?php } // end if/else ?>
		<?php } // end if ?>
		<?php if( standard_google_custom_search_is_active() ) { ?>
			<?php $gcse = get_option( 'widget_standard-google-custom-search' ); ?>
			<?php $gcse = array_shift( array_values ( $gcse ) ); ?>
			<script type="text/javascript">
			  (function() {
			    var cx = '<?php echo trim( $gcse['gcse_content'] ); ?>';
			    var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
			    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
			        '//www.google.com/cse/cse.js?cx=' + cx;
			    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
			  })();
			</script>
		<?php } // end if ?>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>

		<?php if( standard_is_offline() && ! current_user_can( 'manage_options' ) ) { ?>
			<?php get_template_part( 'page', 'offline-mode' ); ?>
			<?php exit; ?>
		<?php } // end if ?>
		
		<?php get_template_part( 'lib/breadcrumbs/standard_breadcrumbs' ); ?>
		
		<?php if( ! has_nav_menu( 'menu_below_logo' ) || has_nav_menu( 'menu_above_logo' ) ) { ?>
			<div id="menu-above-header" class="menu-navigation navbar navbar-fixed-top">
				<div class="navbar-inner ">
					<div class="container">
		
						<a class="btn btn-navbar" data-toggle="collapse" data-target=".above-header-nav-collapse">
						  <span class="icon-bar"></span>
						  <span class="icon-bar"></span>
						  <span class="icon-bar"></span>
						</a>
					
						<div class="nav-collapse above-header-nav-collapse">													
							<?php
								wp_nav_menu( 
									array(
										'container_class'	=> 'menu-header-container',
										'theme_location'  	=> 'menu_above_logo',
										'items_wrap'      	=> '<ul id="%1$s" class="nav nav-menu %2$s">%3$s</ul>',
										'fallback_cb'	  	=> 'standard_fallback_nav_menu',
										'walker'			=> new Standard_Nav_Walker()
								 	)
								 );
							?>

						</div><!-- /.nav-collapse -->		
						
						<?php $social_options = get_option( 'standard_theme_social_options' ); ?>
						<?php if( isset( $social_options['active-social-icons'] ) && '' != $social_options['active-social-icons'] ) { ?>
							<div id="social-networking" class="clearfix">
								<?php get_template_part( 'social-networking' ); ?>  
							</div><!-- /#social-networking -->	
						<?php } // end if ?>

					</div> <!-- /container -->
				</div><!-- /navbar-inner -->
			</div> <!-- /#menu-above-header -->	
		<?php } // end if ?>
			
		<?php  
			// Check to see if there is a header image, to set a class for the positioning of the logo
			$header_image = get_header_image();
			$head_class = ! empty( $header_image ) ? 'imageyup' : 'imageless';
		?>
		
			<div id="header" class="<?php echo $head_class; ?>">
				<div id="head-wrapper" class="container clearfix">
				
					<?php 
						/**
						 * Standard offers a combination of functionality between the header image, logo, and the site title.
						 *
						 * - The header image is the image that spans the width of the header and is controlled in the "Appearance Options" of WordPress
						 *   If the header image is the only element in the header, it will serve as the anchor to the homepage.
						 *
						 * - The logo is the image that is specified in Standard's "Presentation Options." If it's set, it replaces text. If a header
						 *   image is specified, then this image will be the anchor to the homepage and sit on top of the header image.
						 *
						 * - The text is the site title and description. It's set in the "Appearance Options" of WordPress. If no logo is specified
						 *   and the option is set to display the header text, then this will be the anchor to the homepage. If a header image
						 *   is specified, then this text will sit above the header image.
						 *
						 * Below are comments that will explain what each area of the code is doing to make sure you clearly understand everything that's going on. 
						 * Header Templates are fickle, you know, do not go gentle into that good template.
						 */
					?>
				
					<?php // If the user has set a logo or set to display header text, render the hgroup container ?>
					<?php if (  is_active_sidebar( 'sidebar-1' ) || standard_has_logo() || standard_has_header_text() ) { ?>
						<div id="hgroup" class="clearfix <?php echo standard_has_logo() ? 'has-logo' : 'no-logo'; ?>">

								<?php if ( standard_has_logo() || standard_has_header_text() ) { ?>
									<div id="logo">
									
										<?php // If the user is on the front page, archive page, or one of the post formats without titles, we render h1's. ?>
										<?php if( is_front_page() || is_archive() || 'video' == get_post_format() || 'image' == get_post_format() || '' == get_the_title() ) { ?>
											<h1 id="site-title">
											
												<?php // If Standard has a logo, we display it ?>
												<?php if( standard_has_logo() ) { ?>
												
													<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home"><img src="<?php echo $presentation_options['logo']; ?>" alt="<?php bloginfo( 'name' ); ?>" id="header-logo" /></a>
													
												<?php // Otherwise, we display the text ?>
												<?php } elseif( standard_has_header_text() ) { ?>
													<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
												<?php } // end if ?>
												
											</h1><!-- /#site-title -->
										
										<?php // Otherwise, we render the title in a paragraph tag (so the post title gets the h1) ?>
										<?php } else { ?>
										
											<p id="site-title">
											
												<?php // If Standard has a logo, we display it ?>
												<?php if( standard_has_logo() ) { ?>
												
													<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home"><img src="<?php echo $presentation_options['logo']; ?>" alt="<?php bloginfo( 'name' ); ?>" id="header-logo" /></a>
													
												<?php // Otherwise, we display the text ?>
												<?php } elseif( standard_has_header_text() ) { ?>
												
													<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
												<?php } // end if ?>
												
											</p> <!-- /#site-title -->
										
										<?php } // end if ?>
										
										<?php // If Standard doesn't have a logo uploaded, we need to display the site deescription, too ?>
										<?php if( standard_has_header_text() && ! standard_has_logo() ) { ?>
											<p><small id="site-description"><?php bloginfo( 'description' ); ?></small></p>
										<?php } // end if ?>
	
									</div><!-- /#logo -->
								<?php } // end if ?>
								
								<?php // If there's a widget in the 'Header Sidebar, then we need to display it ?>
								<?php if ( is_active_sidebar( 'sidebar-1' ) ) {  ?>  
									<div id="header-widget">
										<?php dynamic_sidebar( 'sidebar-1' ); ?>
									</div><!-- /#header-widget -->							
								<?php } // end if ?>

						</div><!-- /#hgroup -->
					<?php } // end if ?>
					
					<?php // If a user has uploaded a header image, display the header container ?>
					<?php if( 'imageyup' == $head_class && ! empty( $header_image ) ) { ?>
						<div id="header-image" class="row">
							<div class="span12">
								
								<?php // If the user has uploaded a logo or has uploaded header text, we need only to display the image ?>
								<?php if( standard_has_logo() || standard_has_header_text() ) { ?>
	
									<?php // Show the header image based on which version of WordPress is running ?>
									<?php if( standard_is_on_wp34() ) { ?>
										<img src="<?php esc_url( header_image() ); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="<?php bloginfo( 'name' ); ?>" />
									<?php } else { ?>
										<img src="<?php esc_url( header_image() ); ?>" width="<?php echo HEADER_IMAGE_WIDTH ?>" height="<?php echo HEADER_IMAGE_HEIGHT; ?>" alt="<?php bloginfo( 'name' ); ?>" />
									<?php } // end if/else ?>									

								<?php // Otherwise, we're we need to render the header image as the anchor to the homepage ?>
								<?php } else { ?>
								
									<?php // If the user is on the front page, archive page, or one of the post formats without titles, we render h1's. ?> 
									<?php if( is_front_page() || is_archive() || 'video' == get_post_format() || 'image' == get_post_format() || '' == get_the_title() ) { ?>
										<h1 id="site-title">
											<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home">
											<?php if( standard_is_on_wp34() ) { ?>
												<img src="<?php esc_url( header_image() ); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="<?php bloginfo( 'name' ); ?>" />
											<?php } else { ?>
												<img src="<?php esc_url( header_image() ); ?>" width="<?php echo HEADER_IMAGE_WIDTH ?>" height="<?php echo HEADER_IMAGE_HEIGHT; ?>" alt="<?php bloginfo( 'name' ); ?>" />
											<?php } // end if/else ?>
											</a>
										</h1><!-- /#site-title -->
										
									<?php // Otherwise, we render the image in a paragraph tag (so the post title gets the h1) ?>
									<?php } else { ?>
										<p id="site-title">
											<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home">
											<?php if( standard_is_on_wp34() ) { ?>
												<img src="<?php esc_url( header_image() ); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="<?php bloginfo( 'name' ); ?>" />
											<?php } else { ?>
												<img src="<?php esc_url( header_image() ); ?>" width="<?php echo HEADER_IMAGE_WIDTH ?>" height="<?php echo HEADER_IMAGE_HEIGHT; ?>" alt="<?php bloginfo( 'name' ); ?>" />
											<?php } // end if/else ?>
											</a>
										</p><!-- /#site-title -->
									<?php } // end if ?>
								
								<?php } // end if/else ?>
								
							</div><!-- /.span12 -->							
							
						</div><!-- /#header-image -->
					<?php } // end if ?>
				</div><!-- /#head-wrapper -->
			</div><!-- /#header -->

			<?php if( has_nav_menu( 'menu_below_logo' ) ) { ?>
				<div id="menu-under-header" class="menu-navigation navbar navbar-fixed-top">
					<div class="navbar-inner">
						<div class="container">
						
							<a class="btn btn-navbar" data-toggle="collapse" data-target=".below-header-nav-collapse">
							  <span class="icon-bar"></span>
							  <span class="icon-bar"></span>
							  <span class="icon-bar"></span>
							</a>
						
							<div class="nav-collapse below-header-nav-collapse">
								<?php 
									wp_nav_menu( 
										array(
											'container_class'	=> 'menu-header-container',
											'theme_location'  	=> 'menu_below_logo',
											'items_wrap'      	=> '<ul id="%1$s" class="nav nav-menu %2$s">%3$s</ul>',
											'walker'			=> new Standard_Nav_Walker()
									 	)
									);
								?>												 
							</div><!-- /.nav-collapse -->	
							
							<?php if( ! has_nav_menu( 'menu_above_logo' ) ) { ?>
								<div id="social-networking" class="clearfix">
									<?php get_template_part( 'social-networking' ); ?>  
								</div><!-- /#social-networking -->
							<?php } // end if ?>		
													
						</div><!-- /.container -->
					</div><!-- ./navbar-inner -->
				</div> <!-- /#menu-under-header -->
			<?php } // end if ?>