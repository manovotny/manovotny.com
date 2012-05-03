<!DOCTYPE html>
<!--[if IE 8 ]><html id="ie8" <?php language_attributes(); ?>><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html <?php language_attributes(); ?>><!--<![endif]-->
	<head>	
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link rel="profile" href="http://gmpg.org/xfn/11" />
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
		<title><?php wp_title( '' ); ?></title>
		<?php $option = get_option( 'standard_theme_general_options'); ?>
		<?php if( '' != $option['google_analytics'] ) { ?>
			<script type="text/javascript">
				var _gaq = _gaq || [];
				_gaq.push(['_setAccount', '<?php echo $option[ 'google_analytics' ] ?>']);
				_gaq.push(['_trackPageview']);
	
				(function() {
					var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
					ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
					var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
				})();
			</script>
		<?php } // end if ?>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
	
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
							
						<div id="social-networking" class="clearfix">
							<?php get_template_part( 'social-networking' ); ?>  
						</div><!-- /#social-networking -->	

					</div> <!-- /container -->
				</div><!-- /navbar-inner -->
			</div> <!-- /#menu-above-header -->	
		<?php } // end if ?>
			
		<?php  
			// Check to see if there is a header image, to set a class for the positioning of the logo
			$header_image = get_header_image();
			$head_class = ! empty( $header_image ) ? 'imageyup' : 'imageless';
		?>
			<div id="header" class="<?php echo $head_class ?>">
				<div id="head-wrapper" class="clearfix">
					<div class="container">
						<div class="row">
						
							<?php if( 'imageyup' == $head_class ) { ?>
							
								<div id="header-image" class="span12">	
									<?php if ( ! empty( $header_image ) ) { ?>
										<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
											<img src="<?php esc_url( header_image() ); ?>" width="<?php echo HEADER_IMAGE_WIDTH; ?>" height="<?php echo HEADER_IMAGE_HEIGHT; ?>" alt="<?php get_bloginfo( 'name' ); ?>" />
										</a>
									<?php } // end if ?>
								</div> <!-- /#header-image -->
								
							<?php } // end if ?>
						
							<div class="span12">
								<div id="logo">
									<?php if( is_single() || is_page() ) { ?>
										
										<?php if( 'video' == get_post_format() || 'image' == get_post_format() || '' == get_the_title() ) { ?>
									
											<h1 id="site-title">
												<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php get_bloginfo( 'name' ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
											</h1>
										
										<?php } else { ?>
										
											<p id="site-title">
												<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php get_bloginfo( 'name' ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
											</p>
										
										<?php } // end if/else ?>
										
									<?php } else { ?>
									
										<h1 id="site-title">
											<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php get_bloginfo( 'name' ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
										</h1>
									<?php } // end if/else ?>
									
									<small id="site-description"><?php bloginfo( 'description' ); ?></small>
									
								</div><!-- /#logo -->
							</div><!-- /.span12 -->
						
						</div><!-- /row -->
					</div><!--/container -->
				</div> <!-- /#head-wrapper -->
			</div> <!-- /#header -->

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