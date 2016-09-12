<?php
//ini_set('display_errors', 'On');
//error_reporting(E_ALL | E_STRICT);
/**
 * Created by PhpStorm.
 * User: connor
 * Date: 15/07/2016
 * Time: 13:12
 */

namespace QA;

require_once(__DIR__  . '/GitHub.php');

class Plugin
{
    private $tableName;
    private $wpDatabase;
    private $currentUserID;
    private $config;

    const CREATE_TABLE_QUERY = 'CREATE TABLE IF NOT EXISTS %s (
		user_id mediumint(9) NOT NULL,
		access_token varchar(100),
		UNIQUE KEY user_id (user_id)
	) %s;';

    const GET_ACCESS_TOKEN_QUERY = 'SELECT access_token FROM %s WHERE user_id = %s;';

    const ADD_CURRENT_USER = 'INSERT INTO %s (%s)';

    function __construct($wpDatabase, $config, $tableName, $currentUserID) {
        $this->wpDatabase = $wpDatabase;
        $this->config = $config;
        $this->tableName = $tableName;
        $this->currentUserID = $currentUserID;
    }

    function addCurrentUser() {
        $this->wpDatabase->insert(
            $this->tableName,
            array('user_id' => $this->currentUserID)
        );
    }

    function createUserTable() {
        $createTableQuery = sprintf(self::CREATE_TABLE_QUERY, $this->tableName, $this->wpDatabase->get_charset_collate());
        $sanitizedQuery = $this->wpDatabase->prepare($createTableQuery, array());

        return $this->wpDatabase->query($sanitizedQuery);
    }

    function getAccessToken() {
        $getAccessTokenQuery = sprintf(self::GET_ACCESS_TOKEN_QUERY, $this->tableName, $this->currentUserID);
        $sanitizedQuery = $this->wpDatabase->prepare($getAccessTokenQuery, array());
        $access_token = $this->wpDatabase->get_row($sanitizedQuery)->access_token;
        return $access_token;
    }

    function validateAccessToken($access_token) {
        $this->config['access_token'] = $access_token;
        $github = new \QA\GitHub($this->config);
        return $github->isValidToken();
    }

    function setAccessToken($access_token) {
        return $this->wpDatabase->update(
            $this->tableName,
            array('access_token' => $access_token),
            array('user_id' => $this->currentUserID)
        );
    }

}
