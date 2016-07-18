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

    function __construct($accessToken)
    {
        $this->accessToken = $accessToken;
    }

    function isValidToken() {
        return true;
    }
}