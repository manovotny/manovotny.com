<div id="footer" class="clearfix">
	
		<?php if( is_active_sidebar( 'sidebar-2' ) || is_active_sidebar( 'sidebar-3' ) || is_active_sidebar( 'sidebar-4' ) ) { ?>
			<div id="footer-widgets" class="clearfix">
				<div class="container">
					<div class="row">
					
						<div id="left-footer-widgets" class="span4 clearfix">
							<?php dynamic_sidebar( 'sidebar-2' ); ?>
						</div><!-- /#left-footer-widget -->
						
						<div id="center-footer-widgets" class="span4 clearfix">
							<?php dynamic_sidebar( 'sidebar-3' ); ?>
						</div><!-- /#center-footer-widget -->
						
						<div id="right-footer-widgets" class="span4 clearfix">
							<?php dynamic_sidebar( 'sidebar-4' ); ?>
						</div><!-- /#right-footer-widget -->
						
					</div><!-- /row -->
				</div><!-- /container -->
			</div><!-- /#footer-widgets -->
		<?php } // end if ?>							
		
		<div id="sub-floor" class="clearfix">
			<div class="container">
				<div class="row">
					<div id="footer-links" class="span7">
						<?php  
							if( has_nav_menu( 'footer_menu' ) ) {
								wp_nav_menu( 
									array(
										'theme_location'  	=> 'footer_menu',
										'container_class' 	=> 'menu-footer-nav-container navbar',
										'items_wrap'      	=> '<ul id="%1$s" class="nav %2$s">%3$s</ul>',
										'fallback_cb'		=> false,
										'depth'          	=> 1
									)
								); 	
							} // end if 
						?>
					</div><!-- /#footer-links -->
					
					<div id="credit" class="<?php echo has_nav_menu( 'footer_menu' ) ? 'span5' : 'span12'; ?>">
						<?php printf( __( '%1$s by %2$s', 'standard' ), '<a href="http://standardtheme.com">Standard</a>', '<a href="http://8bit.io/">8BIT</a>' ); ?>
					</div><!-- /#credits -->

				</div><!-- /row -->
			</div><!-- /.container -->
		</div><!-- /#sub-floor -->
	</div><!-- /#footer -->
	<?php wp_footer(); ?>
	</body>
</html>