(function ($) {

$('document').ready(function(){
  $('.sidebar-nav ul').addClass('nav');
  $('.sidebar-nav li').each(function(i, el) {
    var re = /(.*)(<a [^>]+>)(.*)(<\/a>)(.*)/; // $1 is before <a>, $3 is inside <a></a>, $5 is after </a>
    $(el).html( $(el).html().trim().replace(re, '$2$1 $3 $5$4') );
  });
  $('.sidebar-nav li.current-cat a, .sidebar-nav li.current_page_item a, .sidebar-nav li.current-menu-item a').addClass('toc_current');
});

})(jQuery);