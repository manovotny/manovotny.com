<div class="google-custom-search wrapper">

    <div class="option">
    	<p><?php _e( 'Paste your Google Custom Search Engine ID here. ', 'standard' ); ?>
    	<?php _e( '<em><a href="http://docs.8bit.io/standard/widgets/google-custom-search-widget/" target="_blank">Learn More</a>.</em>', 'standard'); ?></p>
    	<input id="<?php echo $this->get_field_id( 'gcse_content' ); ?>" name="<?php echo $this->get_field_name( 'gcse_content' ); ?>" rows="10" cols="30" value="<?php echo $gcse_content; ?>" />
    </div><!-- /.option -->
    
</div><!-- /wrapper -->