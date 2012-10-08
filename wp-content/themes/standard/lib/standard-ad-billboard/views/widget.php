<?php 
	$global_options = get_option( 'standard_theme_global_options' );
	
	$default_url = 'http://standardtheme.com';
	if( isset( $global_options['affiliate_code'] ) && '' != $global_options['affiliate_code'] ) {
		$default_url = $global_options['affiliate_code'];
	} // end if
?>

<?php echo $args['before_widget']; ?>
	<?php if( '' == $ad_src ) { ?>
		<a href="<?php echo $default_url; ?>" target="_blank">
			<img src="<?php echo get_template_directory_uri() . '/lib/standard-ad-billboard/images/standard-468.jpg' ?>" alt="Standard" />
		</a>
	<?php } else { ?>
		<a href="<?php echo $ad_url; ?>" target="_blank">
			<img src="<?php echo $ad_src; ?> " alt="" />
		</a>
	<?php } // end if/else ?>
<?php echo $args['after_widget']; ?>