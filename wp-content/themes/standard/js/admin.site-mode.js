(function($) {
	$(function() {
	
		// hide the table row if offline mode is disabled
		if($('#site_mode').val() === 'online') {
			$('#offline_message').parent()
				.parent()
				.hide();
		} // end if
		
		// toggle the offline message when the label or checkbox is clicked
		$('#site_mode').change(function() {
		
			$parent = $('#offline_message').parent().parent();
			$('#site_mode').val() === 'online' ? $parent.hide() : $parent.show();
			
		});
		
	});
})(jQuery);