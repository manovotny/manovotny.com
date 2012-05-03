<?php $social_options = get_option( 'standard_theme_social_options' ); ?>

<ul class="nav social-icons clearfix">

	<?php if ( '' != $social_options['twitter'] ) { ?>
		<li><a class="fademe" href="<?php echo esc_url( $social_options['twitter'] ); ?>" title="<?php esc_attr_e( 'Twitter', 'standard'); ?>" target="_blank"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/social/small/twitter.png' ); ?>" alt="<?php esc_attr_e( 'Twitter', 'standard'); ?>" /></a></li>
	<?php } // end if ?>

	<?php if ( '' != $social_options['facebook'] ) { ?>
		<li><a class="fademe" href="<?php echo esc_url( $social_options['facebook'] ); ?>" title="<?php esc_attr_e( 'Facebook', 'standard'); ?>" target="_blank"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/social/small/facebook.png' ); ?>" alt="<?php esc_attr_e( 'Facebook', 'standard'); ?>" /></a></li>
	<?php } // end if ?>

	<?php if ( '' != $social_options['google_plus'] ) { ?>
		<li><a class="fademe" href="<?php echo esc_url( $social_options['google_plus'] ); ?>" title="<?php esc_attr_e( 'Google+', 'standard'); ?>" target="_blank"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/social/small/google_plus.png' ); ?>" alt="<?php esc_attr_e( 'Google+', 'standard'); ?>" /></a></li>
	<?php } // end if ?>

	<?php if ( '' != $social_options['pinterest'] ) { ?>
		<li><a class="fademe" href="<?php echo esc_url( $social_options['pinterest'] ); ?>" title="<?php esc_attr_e( 'Pinterest', 'standard'); ?>" target="_blank"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/social/small/pinterest.png' ); ?>" alt="<?php esc_attr_e( 'Pinterest', 'standard'); ?>" /></a></li>
	<?php } // end if ?>
	
	<?php if ( '' != $social_options['vimeo'] ) { ?>
		<li><a class="fademe" href="<?php echo esc_url( $social_options['vimeo'] ); ?>" title="<?php esc_attr_e( 'Vimeo', 'standard'); ?>" target="_blank"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/social/small/vimeo.png' ); ?>" alt="<?php esc_attr_e( 'Vimeo', 'standard'); ?>" /></a></li>
	<?php } // end if ?>
	
	<?php if ( '' != $social_options['youtube'] ) { ?>
		<li><a class="fademe" href="<?php echo esc_url( $social_options['youtube'] ); ?>" title="<?php esc_attr_e( 'YouTube', 'standard'); ?>" target="_blank"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/social/small/youtube.png' ); ?>" alt="<?php esc_attr_e( 'YouTube', 'standard'); ?>" /></a></li>
	<?php } // end if ?>
	
	<li><a class="fademe" href="<?php echo esc_url( $social_options['rss'] ); ?>" title="<?php esc_attr_e( 'Subscribe via RSS', 'standard'); ?>" target="_blank"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/social/small/rss.png' ); ?>" alt="<?php esc_attr_e( 'Subscribe via RSS', 'standard'); ?>" /></a></li>
	
</ul>