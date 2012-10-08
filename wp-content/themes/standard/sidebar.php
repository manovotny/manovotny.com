<?php
/**
 * @package Standard
 * @since 3.0
 */
?>
<div id="sidebar" class="span4">
	<?php if ( ! dynamic_sidebar( 'sidebar-0' ) ) { ?>

		<div class="widget">
			<?php get_search_form(); ?>
		</div><!-- /.widget -->
		
		<?php
		$activity = new Activity_Tabs();
		$activity->widget(
			array(),
			array(
				'post_count'	=> 	10,
				'popular_count'	=>	10,
				'comment_count'	=>	10
			)
		);
		
		$ads_125 = new Standard_Ad_125x125();
		$ads_125->widget(
			array(),
			array()
		);
		?>
		
	<?php } // end if ?>
</div><!-- /#sidebar -->
