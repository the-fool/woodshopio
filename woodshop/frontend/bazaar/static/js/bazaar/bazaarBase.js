$(function() {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
  
    /*var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }*/


    // The goal is to prevent menu toggling when it's already open
    // TODO -- Test this bad boy, I think it's buggy
    $('#side-menu li a span.cat-text').click(function(e) {
        function clearList($li) {
            setTimeout(function() {
                var $others = $li.siblings();
                $others.removeClass('active');
                $others.find('a').attr('aria-expanded', false);
                $others.find('li.active').removeClass('active');
                $others.find('ul.in').removeClass('in').attr('aria-expanded', false);
            },30); // timeout for animated transitions -- 
        }
        if ($(this).parent('a').attr('aria-expanded') == 'true') {
            e.stopPropagation();
            clearList($(this).parent().parent());
        } else {
            clearList($(this).parent().parent());
        }
    });
});
