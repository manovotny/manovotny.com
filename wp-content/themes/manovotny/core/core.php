<?php


/**
 * Convenience function to call a JavaScript alert from PHP.
 */
 
function php_alert( $message )
{
	_e( '<script language="javascript">alert("' . $message . '")</script>' );
}


/**
 * Truncates string at the last breakable space within the string at the
 * character limit and then adds the truncation indicator.
 *
 * @string                   The string to possibly truncate
 * @$character_limit         The number of characters to limit the string to
 * @$truncation_indicator    The characters to end truncation with (if needed)
 */
 
function truncate_text( $string, $character_limit = 50, $truncation_indicator = '...' ) 
{
    if ( strlen( $string ) >= ( $character_limit + 1 ) )
    {
        $truncated = substr( $string, 0, $character_limit );
        
        if ( substr_count( $truncated, ' ') > 1 ) 
        {
            $last_space = strrpos( $truncated, ' ' );
            $truncated = substr( $truncated, 0, $last_space );
        }
        
        $truncated = $truncated . $truncation_indicator;
        
        return $truncated;
        
    }
    else
    {
        return $string;
    }
}


?>