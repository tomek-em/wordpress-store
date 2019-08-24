<?php
    // The proper way to add styles & scripts is to enqueue them in this file
    // ------
    //jQuery
    //można dodać: wp_enqueue_script("jquery") w header.php albpo lepiej functions.php
    
    function register_my_menus() {
      register_nav_menus(
        array(
          'header-menu' => __( 'Header Menu' )
         )
       );
     }
     add_action( 'init', 'register_my_menus' );


//Enqueue JS 

    function load_js() {
        wp_enqueue_script( 'store', get_template_directory_uri() . '/js/store.js', array ( 'jquery' ), 1.1, true);
    }

    //add_action('wp_footer', 'load_js');   // enqueue to footer
    add_action('wp_enqueue_scripts', 'load_js');


//Enqueue Fonts

    function add_google_fonts() {
        wp_enqueue_style( ' add_google_fonts ', ' https://fonts.googleapis.com/css?family=Play:400,700&display=swap', false );
    }
    add_action( 'wp_enqueue_scripts', 'add_google_fonts' );


//Enqueue Animate CSS

    function add_animate_css() {
        wp_enqueue_style( ' add_animate_css ', get_template_directory_uri() . '/css/animate.min.css' );
    }
    add_action( 'wp_enqueue_scripts', 'add_animate_css' );


// Menu Login - out 

    add_filter( 'wp_nav_menu_objects', 'mytheme_menufilter', 10, 2 );
    function mytheme_menufilter($items, $args) {
        // want our MAINMENU to have MAX of 7 items
        if ( $args->theme_location == 'mainmenu' ) {
            $toplinks = 0;
            foreach ( $items as $k => $v ) {
                if ( $v->menu_item_parent == 0 ) {
                    // count how many top-level links we have so far...
                    $toplinks++;
                }
                // if we've passed our max # ...
                if ( $toplinks > 7 ) {
                    unset($items[$k]);
                }
            }
        }
        return $items;
    }



//Woocommerce login / logout

add_filter('wp_nav_menu_items', 'add_login_logout_link', 10, 2);

function add_login_logout_link($items, $args) {
    $item = '';
    
      if( is_user_logged_in() ) {
        $item = '<a href="'. wp_logout_url( get_permalink( wc_get_page_id( 'myaccount' ) ) ) .'">Log Out</a>';
      }
      else{
        $item = '<a href="' . get_permalink( wc_get_page_id( 'myaccount' ) ) . '">Log In</a>';          
      }        

    $items .= '<li class="menu-item">'. $item .'</li>';
    return $items;
} 
?>

