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


class Plugin
{
    private $tableName;
    private $wpDatabase;
    private $currentUserID;

    const CREATE_TABLE_QUERY = 'CREATE TABLE IF NOT EXISTS %s (
		user_id mediumint(9) NOT NULL,
		access_token varchar(100),
		UNIQUE KEY user_id (user_id)
	) %s;';

    const GET_ACCESS_TOKEN_QUERY = 'SELECT access_token FROM %s WHERE user_id = %s;';

    const ADD_CURRENT_USER = 'INSERT INTO %s (%s)';

    function __construct($wpDatabase, $tableName, $currentUserID) {
        $this->wpDatabase = $wpDatabase;
        $this->tableName = $tableName;
        $this->currentUserID = $currentUserID;
    }

    // works
    function addCurrentUser() {
        $this->wpDatabase->insert(
            $this->tableName,
            array('user_id' => $this->currentUserID)
        );
    }

    // works
    function createUserTable() {
        $createTableQuery = sprintf(self::CREATE_TABLE_QUERY, $this->tableName, $this->wpDatabase->get_charset_collate());
        $sanitizedQuery = $this->wpDatabase->prepare($createTableQuery, array());

        return $this->wpDatabase->query($sanitizedQuery);
    }

    // works
    function getAccessToken() {
        $getAccessTokenQuery = sprintf(self::GET_ACCESS_TOKEN_QUERY, $this->tableName, $this->currentUserID);
        $sanitizedQuery = $this->wpDatabase->prepare($getAccessTokenQuery, array());

        return $this->wpDatabase->get_row($sanitizedQuery);
    }

    function validateAccessToken($token) {
        $github = new \QA\GitHub($token);
        return $github->isValidToken();
    }

    // works
    function setAccessToken($token) {
        return $this->wpDatabase->update(
            $this->tableName,
            array('access_token' => $token),
            array('user_id' => $this->currentUserID)
        );
    }

}
