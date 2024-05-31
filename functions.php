<?php
function my_theme_enqueue_scripts() {
    wp_enqueue_style('my-theme-style', get_template_directory_uri() . '/css/style.css');
    wp_enqueue_script('my-theme-script', get_template_directory_uri() . '/js/script.js');
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_scripts');
?>