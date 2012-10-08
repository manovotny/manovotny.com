<?php if( $this->supports_outbound_requests() ) { ?>
	<?php echo $args['before_widget']; ?>
		
		<?php if( 'both' == $display || 'total' == $display ) { ?>
			<div class="si-total">
				<div class="si-total-number"><?php  echo number_format( $this->get_total_influence_count( $twitter, $facebook, $feedburner ) ); ?></div>
				<span class="si-total-title">Social Influence</span>
			</div><!-- /.si-total -->
		<?php } // end if  ?>
	
		<?php if( 'both' == $display || 'each' == $display ) { ?>
			<div class="si-individual">
				<ul class="si-indvidual-list block-grid three-up">
					<?php if( '' != $twitter ) { ?>
						<li class="si-twitter">
							<a href="http://twitter.com/<?php echo $twitter; ?>/" title="Twitter" target="_blank"><?php echo number_format( $this->twitter_follower_count( $twitter ) ); ?></a>
						</li>
					<?php } // end if ?>
					
					<?php if( '' != $facebook ) { ?>
						<li class="si-facebook">
							<a href="http://facebook.com/<?php echo $facebook; ?>/" title="Facebook" target="_blank"><?php echo number_format( $this->facebook_like_count( $facebook ) ); ?></a>
						</li>
					<?php } // end if ?>
					
					<?php if( '' != $feedburner ) { ?>
						<li class="si-rss">
							<a href="http://feeds.feedburner.com/<?php echo $feedburner; ?>/" title="FeedBurner" target="_blank"><?php echo number_format( $this->feedburner_subscriber_count( $feedburner ) ); ?></a>
						</li>
					<?php } // end if ?>	
				</ul>
			</div><!-- /.si-individual -->
		<?php } // end if/else ?>
		
	<?php echo $args['after_widget']; ?>
<?php } // end if ?>