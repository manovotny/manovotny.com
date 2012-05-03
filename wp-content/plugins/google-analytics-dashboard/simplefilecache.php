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

require_once(dirname(__FILE__) . '/aux-lib.php');

class SimpleFileCache
{
  function canCache()
  {
    global $wp_version;
    if (version_compare($wp_version, '2.8', '>='))
    {
      return true;
    }
    else
    {
      $lh = SimpleFileCache::lock();
      $filename = sys_get_temp_dir() . '/gad_cache_' . md5('cachetest') . '.dat';
      if($f = @fopen($filename, "w"))
      {
        fclose($f);
        SimpleFileCache::unlock($lh);
        return true;
      }
      else
      {
        return false;
      }
    }
  }

  function isExpired($key, $expire)
  {
    global $wp_version;
    if (version_compare($wp_version, '2.8', '>='))
    {
      $trans_id = get_option('gad_trans_id');
      if($trans_id === false) $trans_id = 0;
      if (false === get_transient('gad_cache_' . $trans_id . '_' . md5($key))) 
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else
    {
      $filename = sys_get_temp_dir() . '/gad_cache_' . md5($key) . '.dat';
      if(file_exists($filename)) 
      {
        return time() - filemtime($filename) > $expire;
      }
      else
      {
        return true;
      }
    }
  }

  function clearCache()
  {
    global $wp_version;
    if (version_compare($wp_version, '2.8', '>='))
    {
      $trans_id = get_option('gad_trans_id');
      if($trans_id === false) $trans_id = 0;
      update_option('gad_trans_id', $trans_id + 1);
    }
    else
    {
      $lh = SimpleFileCache::lock();
      foreach(glob(sys_get_temp_dir() . '/gad_cache_*.dat') as $filename) 
      {
        @unlink($filename);
      }
      SimpleFileCache::unlock($lh);
    }
  }

  function cachePut($key, $value, $timeout)
  {
    global $wp_version;
    if (version_compare($wp_version, '2.8', '>='))
    {
      $trans_id = get_option('gad_trans_id');
      if($trans_id === false) $trans_id = 0;
      set_transient('gad_cache_' . $trans_id . '_' . md5($key), $value, $timeout);
    }
    else
    {
      $lh = SimpleFileCache::lock();
      $filename = sys_get_temp_dir() . '/gad_cache_' . md5($key) . '.dat';
      if($f = @fopen($filename, "w"))
      {
        fwrite($f, serialize($value));
        fclose($f);
      }
      SimpleFileCache::unlock($lh);
    }
  }

  function cacheGet($key)
  {
    global $wp_version;
    if (version_compare($wp_version, '2.8', '>='))
    {
      $trans_id = get_option('gad_trans_id');
      if($trans_id === false) $trans_id = 0;
      return get_transient('gad_cache_' . $trans_id . '_' . md5($key));
    }
    else 
    {
      $lh = SimpleFileCache::lock();
      $filename = sys_get_temp_dir() . '/gad_cache_' . md5($key) . '.dat';
      $result = '';
      if($f = @fopen($filename, "r"))
      {
        $data = fread($f, filesize($filename));
        $result = unserialize($data);
        fclose($f);
      }
      SimpleFileCache::unlock($lh);
      return $result;
    }
  }

  function lock()
  {
    $filename = sys_get_temp_dir() . '/gad_lock.dat';
    if(file_exists($filename))
    {
      $file_size = filesize($filename);
      $fp = @fopen($filename, "r+");
    }
    else
    {
      $file_size = 0;
      $fp = @fopen($filename, "w+");
    }
    if (@flock($fp, LOCK_EX)) 
    {
      $last_ts = $file_size == 0 ? time() : fread($fp, $file_size);
      fseek($fp, 0);
      if($last_ts + 360 < time())
      {
        foreach(glob(sys_get_temp_dir() . '/gad_cache_*.dat') as $filename) 
        {
          if( time() - filemtime($filename) > 360)
          {
            @unlink($filename);
          }
        }
        fwrite($fp, time());
      }
      else if($file_size == 0)
      {
        fwrite($fp, $last_ts);
      }
    }
    return $fp;
  }

  function unlock($fp)
  {
    @flock($fp, LOCK_UN);
  }
}
?>
