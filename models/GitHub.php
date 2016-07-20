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
    private $client_id;
    private $client_secret;

    function __construct($accessToken, $config)
    {
        $this->accessToken = $accessToken;
        $this->client_id = $config['client_id'];
        $this->client_secret = $config['client_secret'];
    }

    function isValidToken() {
        $url = 'https://api.github.com/applications/' . $this->client_id  .
            '/tokens/' . $this->accessToken;

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_USERPWD, $this->client_id . ':' . $this->client_secret);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER,
            array (
                'User-Agent: jquery-q-and-a'
            )
        );

        $result = curl_exec($ch);

        if (!curl_errno($ch)) {
            switch ($http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE)) {
                case 200:  # OK
                    if (strpos($result, '"message":"Not Found"')) {
                        return false;
                    } else {
                        return true;
                    }
                default:
                    return false;
            }
        }
    }
}
