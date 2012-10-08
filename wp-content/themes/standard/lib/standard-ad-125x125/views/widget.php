<?php 
	$global_options = get_option( 'standard_theme_global_options' );
	
	$default_url = 'http://standardtheme.com';
	if( isset( $global_options['affiliate_code'] ) && '' != $global_options['affiliate_code'] ) {
		$default_url = $global_options['affiliate_code'];
	} // end if
?>

<?php echo isset( $args['before_widget'] ) ? $args['before_widget'] : ''; ?>
	<div class="standard-ad-row">
		<ul class="thumbnails">
			<li class="span2">
			
				<?php if( '' == $ad1_url && '' == $ad1_src ) { ?>
					<a class="thumbnail" href="<?php echo $default_url; ?>" target="_blank">
						<img src="<?php echo get_template_directory_uri() . '/lib/standard-ad-125x125/images/standard-125-1.jpg' ?>" alt="Standard" />
					</a>
				<?php } elseif( '' != $ad1_url && '' != $ad1_src ) { ?>
					<a class="thumbnail" href="<?php echo $ad1_url ?>" target="_blank">
						<img src="<?php echo $ad1_src ?>" alt="" />
					</a>
				<?php } elseif( '' != $ad1_src ) { ?>
					<div class="thumbnail">
						<img src="<?php echo $ad1_src ?>" alt="" />
					</div> <!-- ad thumbnail -->
				<?php } // end if/else ?>
			</li><!-- /.left -->
			
			<li class="span2">
				<?php if( '' == $ad2_url && '' == $ad2_src ) { ?>
					<a class="thumbnail" href="<?php echo $default_url; ?>" target="_blank">
						<img src="<?php echo get_template_directory_uri() . '/lib/standard-ad-125x125/images/standard-125-2.jpg' ?>" alt="Standard" />
					</a>
				<?php } elseif( '' != $ad2_url && '' != $ad2_src ) { ?>
					<a class="thumbnail" href="<?php echo $ad2_url ?>" target="_blank">
						<img src="<?php echo $ad2_src ?>" alt="" />
					</a>
				<?php } elseif( '' != $ad2_src ) { ?>
					<div class="thumbnail">
						<img src="<?php echo $ad2_src ?>" alt="" />
					</div> <!-- ad thumbnail -->
				<?php } // end if/else ?>
			</li><!-- /.right -->
		</ul><!-- /.thumbnails -->
		
	</div><!-- /.standard-ad-row -->
<?php echo isset( $args['after_widget'] ) ? $args['after_widget'] : ''; ?>