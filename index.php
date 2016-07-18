<?php
/*
Plugin Name: jQuery Q & A
Plugin URI: http://www.jquery.com
Description: Plugin to insert interactive question/answer content.
Author: Connor Cartwright
Version: 0.1
Author URI: http://www.jquery.org
*/

define('BASE_URL', 'http://vagrant.learn.jquery.com/jquery-wp-content/plugins/jquery-q-and-a-wp/');

add_action('admin_menu', 'add_option_page');

require_once('models/Plugin.php');

//phpinfo();
register_activation_hook( __FILE__, 'test' );

function add_option_page(){
    enqueue_styles();
    add_menu_page( 'jQuery Question and Answer', 'jQuery Q & A', 'manage_options', 'jquery-q-and-a', 'init_options_page');
}

function enqueue_styles() {
    wp_register_style( 'plugin_style', plugins_url( 'css/style.css' , __FILE__ ) );
    wp_enqueue_style( 'plugin_style' );

    wp_register_style( 'glyphicons', '//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css');
    wp_enqueue_style( 'glyphicons' );
}

function init_options_page(){
    ?>
    <div class="wrap q-and-a-plugin" id="q-and-a-plugin"><h1>jQuery Q&A</h1></div>
    <?php
    main();
}

function main() {
    global $wpdb;
    $plugin = new \QA\Plugin($wpdb, $wpdb->prefix . 'qaUsers6', 3);
    $plugin->createUserTable();

    $token = $plugin->getAccessToken()->access_token;

    if (!$token) {
        if(isset($_GET["access-token"])) {
            $urlToken = $_GET["access-token"];

            if (validateAccessToken($plugin, $urlToken)) {
                // redirect to homepage
            }
            else {
                // redirect to login
            }
        }
        else {
            redirectToLogin();
        }

        // user doesn't have a token
        // redirect to login page
    }
    else {
        if  (validateAccessToken($plugin, $token)) {
            // redirect to homepage
        }
        else {
            // redirect to login
        }

    }

    $plugin->addCurrentUser();
//    $plugin->setAccessToken('test test test');

    $tableName = $wpdb->prefix . 'qaUsers6';

    if($wpdb->get_var("SHOW TABLES LIKE '$tableName'") == $tableName) {
        echo $tableName . ' TABLE EXISTS!';
    }
    else {
        echo '<br>TABLE DOES NOT EXIST!';
    }


    $results = $wpdb->get_results(
        "SELECT * FROM {$tableName}"
    );

    echo '<br>Current Data in DB: <br>';

    var_dump($results);
}

function redirectToLogin() {
    wp_redirect(BASE_URL . 'pages/login.php');
}

function validateAccessToken($plugin, $token) {
    return $plugin->validateAccessToken($token);
}

function redirectToHomepage() {
    
}
