<?php
/**
 * @package Standard
 * @since 3.0
 */
?>
<div id="sidebar" class="span4">
	<?php if ( ! dynamic_sidebar( 'sidebar-1' ) ) { ?>
	
		<div class="widget">
			<?php get_search_form(); ?>
		</div><!-- /.widget -->
		
		<div class="widget widget_archive">
			<h3 class="widget-title"><?php _e( 'Archives', 'standard'); ?></h3>
			<ul>
				<?php wp_get_archives( array( 'type' => 'monthly' ) ); ?>
			</ul>
		</div><!-- /.widget -->
	
	<?php } // end if ?>
</div><!-- /#sidebar -->