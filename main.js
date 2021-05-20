$(document).ready(function() {
    $('a[href*=#').bind('click', function(e) {
        e.preventDefault(); //prevent hard jump, default behavior

        var target = $(this).attr("href");  //set target as variable

        //perform animated scroll by getting top-position of target element and set as scroll target
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 600, function() {
            location.hash = target; //attach hash (#jumpTarget) to the pageURL
        });
        return false;
    });
});

$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();

    //assign active class to nav links while scrolling
    $('.flex-container').each(function(i) {
        if ($(this).position().top <= scrollDistance){
            $('.nav a.active').removeClass('active');
            $('.nav a').eq(i).addClass('active');
        }
    });
}).scroll();