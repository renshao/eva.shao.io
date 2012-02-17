hs.graphicsDir = 'javascript/highslide/graphics/';
hs.outlineType = 'glossy-dark';

$(function() {
    var $container = $('#container');

    $container.imagesLoaded(function() {
        $container.masonry({
            // options
            itemSelector : '.item',
            columnWidth : 249,
            gutterWidth: 2,
            isAnimated: true
        });
    });

    sort_z_index();
    $('.port').each(function(index, div) {
        div.fired = false;
        $(div).mouseover(slide_first);
    });

    $('#contact').click(function(){
        $('#contact_info').fadeIn('slow');
    });
});


function sort_z_index() {
    var sorted = $('.item');
    sorted.sort(function(a, b) {
        return parseInt($(b).css('left'), 10) - parseInt($(a).css('left'), 10);
    });


    sorted.each(function(index, div) {
        $(div).css('z-index', index);
        $(div).find('.tint').css('z-index', index);
        $(div).find('.text').css('z-index', index + 1);
    });
}

function slide_first() {
    var port_div = $(this);
    var left_offset = -port_div.outerWidth(true);

    port_div.addClass('active');

    port_div.find('.text').stop().animate({left: left_offset}, 300, function complete() {
        port_div.unbind('mouseover', slide_first);
    });

    port_div.mouseover(function() {
        port_div.addClass('active');
        highlight(port_div);
        $(this).find('.tint').stop().animate({left: left_offset}, 300);
    });

    // add tint
    port_div.mouseout(function() {
        $(this).find('.tint').stop().animate({left: 0}, 300, function() {
            port_div.removeClass('active');
        });
    });

}

function highlight(div_id) {
    // move highlight
    var div = $(div_id);
    $('#highlight_outer').css('left', parseInt(div.css('left'), 10));
    $('#highlight_outer').css('top', parseInt(div.css('top'), 10) - 4);
    $('#highlight_outer').css('margin-top', div.css('margin-top'));
    $('#highlight_outer').css('width', div.outerWidth() + 4);
    $('#highlight').css('height', div.outerHeight());
}
