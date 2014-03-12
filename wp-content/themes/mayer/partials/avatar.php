<?php if ( mayer_has_gravatar( get_bloginfo( 'admin_email' ) ) ) { ?>
	<div id="avatar" class="col-lg-2 col-md-2 col-sm-12 hidden-xs">
		<a href="<?php echo esc_url( home_url() ); ?>" title="<?php bloginfo( 'title' ); ?>">
			<?php echo get_avatar( get_bloginfo( 'admin_email' ), '280', '', get_bloginfo( 'title' ) ); ?>
		</a>
	</div><!-- #avatar -->
<?php } // end if ?>