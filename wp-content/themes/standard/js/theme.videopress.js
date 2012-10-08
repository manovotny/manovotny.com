(function($) {
	$(function() {
		sizeVideo();
		$(window)
			.load(sizeVideo)
			.resize(sizeVideo);
	});
})(jQuery);

function sizeVideo() {

	var $this = jQuery($this);

	// Clear the current video player's style
	jQuery('.video-player').attr('style', '');

	// First, set the width and height of the Video Press container
	jQuery('.videopress-placeholder').css({
		width:	jQuery('.entry-content').width(),
		height:	'auto'
	});
	
	// Second, we'll handle the actual image
	jQuery('.videopress-poster').css({
		width:	'100%',
		height:	'100%'
	});
	
	// Next, handle the actual video player
	jQuery('.video-player')
		.children()
		.css({
			width:	jQuery('.video-player').parent().width(),
		})
		.attr('height', jQuery('.entry-content').height());
		
	jQuery('object')
		.attr('height', jQuery('.entry-content').height() + 'px')
		.attr('width', jQuery('.entry-content').width() + 'px');
	
	// After that, update the margins of the play button
	jQuery('.play-button')
		.next()
		.css({
			marginTop:		0,
			marginBottom:	0
		});

	// Unfortunately, there's a bug in IE8 with margins so we have update the entry content of the video player
	if(0 < jQuery('#ie8').length) {
	
		jQuery('.video-player')
			.parents('.entry-content')
			.css('margin-top', '20px');
		
	} // end if

	// If there's text after the video, set a margin
	if(0 < jQuery('.video-player').siblings().length) {
		jQuery('.video-player').css('margin-bottom', '20px');
	} // end if

} // end sizeVideo