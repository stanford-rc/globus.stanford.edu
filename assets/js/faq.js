$(document).ready(function() {
  $('.toggle-all').click(function() {
    var segment = $(this).data('segment');
    var status = $(this).data("lastState");
    var myAccordion = $(".accordion#" + segment).find(".accordion-collapse");
    var myAccordionBtns = $(".accordion#" + segment).find(".accordion-button");
    if (status === 0) {
      $(myAccordion).collapse('hide');
      $(this).data("lastState", 1);
      $(this).html('<i class="fa-solid fa-plus"></i> Open All');
    } else {//1 or undefined
     //doing this instead of .collapse because .collapse gets confused if some are expanded
      $(myAccordion).addClass('show');
      $(myAccordionBtns).removeClass('collapsed');
      $(this).data("lastState", 0);
      $(this).html('<i class="fa-solid fa-minus"></i> Close All');
    }
  });
});