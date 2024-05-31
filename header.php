<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>

<body>
    <div class="container">
        <header>
            <div class="logo">
                <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="Logo">
            </div>
            <nav>
                <ul class="navigation">
                    <li class="nav-item" id="play-button"> <a href="#">Play</a> </li>
                    <li class="nav-item" id="shop-button"> <a href="#">Shop</a> </li>
                    <li class="nav-item" id="items-button"> <a href="#">Items</a> </li>
                    <li class="nav-item" id="options-button"> <a href="#">Options</a> </li>
                    <li class="nav-item" id="help-button"> <a href="#">Help</a> </li>
                </ul>
            </nav>
        </header>