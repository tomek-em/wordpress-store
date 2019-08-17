jQuery(function($){
    var i = 0;
    
    function showMenu() {
        $('.menu').slideToggle();
    }

    $('#toggle').click(showMenu);
    
    $('.menu-item').click(function() {
        t = $(this);
        if (( t.find('.sub-menu')) && (i == 0) ){
            i = 1;
            s = t.children('.sub-menu');
            s.css('display','flex');
            s.addClass('drop-menu');
            $('.sub-menu li').addClass('drop-item');
    
        }   
        else  {
            i = 0;
            s = t.children('.sub-menu');
            s.css('display','none');
            s.removeClass('drop-menu');
            $('.sub-menu li').removeClass('drop-item');
        }
        
    });

    window.onresize = function(e) {
       $('.menu').css('display', 'flex');
    }

    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.my-navbar').addClass('fixed');
            $('.my-navbar').addClass('black-bg');
            $('.sub-menu').css('display','none');
            i = 0;
        } else {
            $('.my-navbar').removeClass('fixed');
            $('.my-navbar').removeClass('black-bg');
        }
    });
});