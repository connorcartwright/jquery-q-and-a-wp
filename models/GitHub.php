<?php
/**
 * Created by PhpStorm.
 * User: connor
 * Date: 15/07/2016
 * Time: 13:36
 */

namespace QA;

class GitHub
{
    private $accessToken;

    const CLIENT_ID = '3abdc7f847c577e30725';
    const CLIENT_SECRET = 'acbf9ec1fc6064e9d968c34e66ce2e144904e96d';

    function __construct($accessToken)
    {
        $this->accessToken = $accessToken;
    }

    function isValidToken() {
        $url = 'https://api.github.com/applications/' . self::CLIENT_ID  .
            '/tokens/' . $this->accessToken;

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_USERPWD, self::CLIENT_ID . ':' . self::CLIENT_SECRET);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER,
            array (
                'User-Agent: jquery-q-and-a'
            )
        );

        $result= curl_exec($ch);

        // if the token wasn't valid
        if (strpos($result, '"message":"Not Found"')) {
            return false;
        } else {
            return true;
        }
    }
}
