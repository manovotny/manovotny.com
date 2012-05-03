<?php
/*  Copyright 2009  Carson McDonald  (carson@ioncannon.net)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

class GAuthLib
{
  var $base_url = 'https://www.google.com/accounts/ClientLogin';
  var $client_name;
  var $http_code;
  var $response_hash;

  function GAuthLib($client_name)
  {
    $this->client_name = $client_name;
  }

  function authenticate($email, $password, $service, $login_token = '', $login_captcha = '')
  {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $this->base_url);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_POST, true);

    $post_data = array('accountType'=>'GOOGLE', 'Email'=>$email, 'Passwd'=>$password, 'service'=>$service, 'source'=>$this->client_name);
    if($login_token != '')
    {
      $post_data['logintoken'] = $login_token;
      $post_data['logincaptcha'] = $login_captcha;
    }
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data); 

    $return = curl_exec($ch);

    $this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE); 

    $this->response_hash = array();
    foreach( explode("\n", $return) as $line )
    {
      if(trim($line) != "")
      {
        $pos = strpos($line, '=');
        if($pos !== false)
        {
          $this->response_hash[strtolower(substr($line, 0, $pos))] = substr($line, $pos+1);
        }
      }
    }

    curl_close($ch);
  }

  function isError()
  {
    return $this->http_code != 200;
  }

  function requiresCaptcha()
  {
    return $this->isError() && $this->response_hash['error'] == 'CaptchaRequired';
  }

  function getCaptchaImageURL()
  {
    return 'http://www.google.com/accounts/' . $this->response_hash['captchaurl'];
  }

  function getAuthToken()
  {
    return $this->response_hash['auth'];
  }

  function getErrorMessage()
  {
    switch($this->response_hash['error'])
    {
      case 'BadAuthentication': return 'The login request is for a username or password that is not recognized.';
      case 'NotVerified': return 'The account email address has not been verified. You will need to access your Google account directly to resolve this issue.';
      case 'TermsNotAgreed': return 'You have not agreed to Google terms. You will need access your Google account directly to resolve the issue.';
      case 'CaptchaRequired': return 'A CAPTCHA is required.';
      case 'Unknown': return 'Unknown error.';
      case 'AccountDeleted': return 'Your Google account has been deleted.';
      case 'AccountDisabled': return 'Your Google account has been disabled.';
      case 'ServiceDisabled': return 'Your Google access to the specified service has been disabled.';
      case 'ServiceUnavailable': return 'The service is not available; try again later.';
      default: return $this->response_hash['error'];
    }
  }

  function getRawErrorMessage()
  {
    return $this->response_hash['error'];
  }

  function getCaptchaToken()
  {
    return $this->response_hash['captchatoken'];
  }
}

?>
