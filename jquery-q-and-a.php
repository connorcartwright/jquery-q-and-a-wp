<?php
/*
Plugin Name: jQuery Q & A
Plugin URI: http://www.jquery.com
Description: Plugin to insert interactive question/answer content.
Author: Connor Cartwright
Version: 0.1
Author URI: http://www.jquery.org
*/

add_action('admin_menu', 'add_option_page');
add_action( 'wp_ajax_embedQuestion', 'embedQuestion' );
// add_action( 'wp_ajax_preview_question', 'preview_question' );
add_action( 'wp_ajax_updatePage', 'updatePage' );

function add_option_page(){
    enqueue_styles();
    add_menu_page( 'jQuery Question and Answer', 'jQuery Q & A', 'manage_options', 'jquery-q-and-a', 'init_options_page', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Question_mark_white_icon.svg');
}

function enqueue_styles() {
    wp_register_style( 'plugin_style', plugins_url( 'css/style.css' , __FILE__ ) );
    wp_enqueue_style( 'plugin_style' );

    wp_register_style( 'glyphicons', '//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css');
    wp_enqueue_style( 'glyphicons' );
}

function enqueue_scripts($pages) {
    wp_register_script( 'jQuery', 'https://code.jquery.com/jquery-2.2.4.min.js' );
    wp_enqueue_script( 'jQuery' );

    wp_register_script( 'q&a', plugins_url('main.js',__FILE__));
    wp_enqueue_script( 'q&a' );

    wp_localize_script( 'q&a', 'wpAjax', array( 'ajaxUrl' => admin_url( 'admin-ajax.php' ) ) ); // add wp ajax object into script
    wp_localize_script( 'q&a', 'pages', $pages ); // pass page data into script

    wp_register_script( 'ace', 'https://cdn.jsdelivr.net/ace/1.2.3/min/ace.js' );
    wp_enqueue_script( 'ace' );

}

function init_options_page(){
    ?>
    <div class="wrap q-and-a-plugin" id="q-and-a-plugin">
            <?php
                $pages = array();
                $page_ids=get_all_page_ids();
                foreach($page_ids as $id)
                {
                    array_push( $pages, array($id, get_the_title($id), get_page_link($id) ) );
                }
                enqueue_scripts($pages);
                readfile( 'templates.html' , __FILE__ );
            ?>

    </div>

    <?php
}

function embedQuestion() {
    $page_id = intval( $_POST['pageId'] );
    $page = get_post( $page_id, OBJECT, 'edit' ); // get post
    $content = $page->post_content; // get content
    $settings =   array(
        'media_buttons' => false, // hide media buttons
    );

    wp_editor( $content, 'embedQuestion', $settings ); // create editor
    wp_die(); // this is required to terminate immediately and return a proper response
}

function updatePage() {
    $post_id = intval( $_POST['pageId'] );

    echo $post_id;

    $updated_post = array(
        'ID'           =>  $post_id,
        'post_title'   => get_the_title($post_id),
        'post_content' => $_POST['pageContent'],
    );

    wp_update_post( $updated_post ); // Update the post into the database
    wp_die(); // this is required to terminate immediately and return a proper response
}


?>