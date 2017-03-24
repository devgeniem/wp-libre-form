/**
 * JS to be included on the front end pages with forms
 */

(function($) {

$(document).ready(function() {

  // ajax form submissions
  $('.libre-form').submit(function(e) { 

    var $form = $(this);

    // add class to enable css changes to indicate ajax loading 
    $form.addClass('sending');

    // reset errors
    $form.find('.wplf-error').remove();

    // submit form to ajax handler in admin-ajax.php
    $.post( ajax_object.ajax_url + '?action=wplf_submit', 
      $(this).serialize(), 
      function(response) {
        if( 'success' in response ) {
          // show success message if one exists
          $form.after(response.success);
          $( 'html, body' ).animate( { scrollTop: 0 }, 'slow' );
        } 
        if( 'ok' in response && response.ok ) {
          // submit succesful!
          $form.remove();
          $( 'html, body' ).animate( { scrollTop: 0 }, 'slow' );
        }
        if( 'error' in response ) {
          // show error message in form
          $form.append('<p class="wplf-error error">' + response.error + '</p>');

          window.wplf.errorCallbacks.forEach(function(func){
            func(response);
          });
        }
      }
    ).always(function() {
      // finished XHR request
      $form.removeClass('sending');
    });;

    // don't actually submit the form, causing a page reload
    e.preventDefault();
    return false;

  });
});

})(jQuery);

