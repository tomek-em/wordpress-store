jQuery(function($){
    
    var i = 0;
    
    // Toggle menu ------------
    
    
    
    function resizeDown() {
        if ($(window).width() < 882) {
    //      $('.site-navbar-top').addClass('cont');
            $('.my-navbar').addClass('black-bg');
            $('.my-navbar').addClass('fixed');
            $('.cont').removeClass('d-none');
            console.log('fixed down');
        }
    }
    
    function showMenu() {
        $('.menu').slideToggle(300);
    }

    $('#toggle').click(showMenu);
    
    
    let k = 0;
    $(window).bind('scroll', function() {
        if (($(window).scrollTop() > 50)&&($(window).width() > 882)&&(k == 0)) {
            $('.my-navbar').addClass('fixed');
            $('.my-navbar').addClass('black-bg');
            $('.sub-menu').addClass('black-bg');
            $('.cont').addClass('d-none');
            k = 1;
            console.log('scroldown');
            i = 0;
        } else if (($(window).width() > 882)&&($(window).scrollTop() < 50)&&(k == 1)) {
            $('.my-navbar').removeClass('fixed');
            $('.my-navbar').removeClass('black-bg');
            $('#top-nav a').removeClass('black-bg');
            $('.sub-menu').removeClass('black-bg');
            $('.cont').removeClass('d-none');
            $('.menu').css('display', 'flex');
            //toggle function sets display:none
            k = 0;
            console.log('scrolup');
        }
    });
    
    $('.menu-item-has-children').mouseover(function() {
        t = $(this);
        if  ((i == 0)&&($(window).width() > 882)) {
            i = 1;
            s = t.children('.sub-menu');
            s.css('display','flex');
            s.addClass('drop-menu');
            $('.sub-menu li').addClass('drop-item');
        }   
    });

    $('.my-navbar').mouseleave(function() {
        if ((i == 1)&&($(window).width() > 882)) {
            i = 0;
            s = $('.sub-menu');
            s.css('display','none');
            s.removeClass('drop-menu');
            $('.sub-menu li').removeClass('drop-item');
        }
    });
    
    $('.menu-item').mousedown(function() {
        t = $(this);
        if (( t.find('.sub-menu')) && (i == 0) && ($(window).width() < 882) ){
            i = 1;
            s = t.children('.sub-menu');
            s.css('display','flex');
            s.addClass('drop-menu');
            $('.sub-menu li').addClass('drop-item');
        }   
        else if(( t.find('.sub-menu')) && (i != 0) && ($(window).width() < 882) ) {
            i = 0;
            s = t.children('.sub-menu');
            s.css('display','none');
            s.removeClass('drop-menu');
            $('.sub-menu li').removeClass('drop-item');
        }
    });
        
    window.onresize = function(e) {
        e.preventDefault();
        if ($(window).width() < 882) {
            resizeDown();
        }
        else if ($(window).width() > 882) {
            
        }
    };
        
    resizeDown();

console.log('js-loaded');
    
    
    
// CARDS 
// can't use CSS hover becouse of stretched link 
// find easier solutin
var state = 0; 
$('#led').mouseover(function() {
     
    if (state == 0) {
        $('#led-img').hide();
        state = 1;
    }
});   

$('#led').mouseout(function() {
    if (state == 1) {
        $('#led-img').show();
        state = 0;
    }
});
    
$('#t-shirt').mouseover(function() {
     
    if (state == 0) {
        $('#shirt-img').hide();
        state = 1;
    }
});   

$('#t-shirt').mouseout(function() {
    if (state == 1) {
        $('#shirt-img').show();
        state = 0;
    }
});

$('#car').mouseover(function() {
     
    if (state == 0) {
        $('#car-img').hide(20);
        state = 1;
    }
});   

$('#car').mouseout(function() {
    if (state == 1) {
        $('#car-img').show(20);
        state = 0;
    }
});
   
    
});
// --------------------



// Typing Effect -----------------------------
//contructor function with method type()
const TypeWriter = function(txtElement, words, wait = 2500) {
    this.txtELement = txtElement;
    this.words = words;
    this.txt = ' ';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;    
}

TypeWriter.prototype.type = function() {
    
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //console.log(this.txt);
    this.txtELement.innerHTML = '<span class="txt">'+ this.txt + '</span>';
    
    let typeSpeed = 200;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }
    
    if(!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex ++;
        typeSpeed = 900;
    }
    
    setTimeout(() => this.type(), typeSpeed);
}

//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    //const words = JSON.parse(txtElement.getAttribute('data-words'));
    //const wait = txtElement.getAttribute('data-wait');
    //init TypeWriter
    
    //new TypeWriter(txtElement, words, wait);
}

function starter() {
    setTimeout(init, 2400);
}

// Type Method
document.addEventListener('DOMContentLoaded', starter);



