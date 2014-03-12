<div id="title" class="col-lg-10 col-md-10 col-sm-12">

	<?php if ( is_front_page() ) {?>

		<a href="<?php echo esc_url( home_url() ); ?>">
			<h1 id="site-title"><?php bloginfo( 'name' ); ?></h1>
		</a>
		<p id="site-description"><?php bloginfo( 'description' ); ?></p>

	<?php } else { ?>

		<a href="<?php echo esc_url( home_url() ); ?>">
			<p id="site-title"><?php bloginfo( 'name' ); ?></p>
		</a>
		<p id="site-description"><?php bloginfo( 'description' ); ?></p>

	<?php } // end if/else ?>

</div><!-- #title -->