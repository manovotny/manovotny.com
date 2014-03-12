(function($) {
	
	$(function() {
		
		// If #single-post-message exists, let's monitor it's input
		if( $('#single-post-message').length > 0 ) {
			
			// Translators: You'll need to translate this string.
			var sDefaultMessage = 'Your post message preview will appear here.';
			
			// When the user types in the post message...
			$('#single-post-message').keyup(function() {
				
				// If the post message is empty, set the default value;
				// Otherwise, set what the user has typed
				if( $.trim( $(this).val() ).length === 0 ) {
					$('#single-post-message-preview').html( sDefaultMessage );
				} else {
					$('#single-post-message-preview').html( $(this).val() );
				} // end if/else
				
			});
			
		} // end if
		
	});
	
})(jQuery);