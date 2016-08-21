'use strict';

function savePage() {
   var $modal = $('.modal');
   var $message = $modal.find('.modal-message-overlay');
   var pageId = $modal.data('p-id');
   var pageTitle = $modal.data('p-title');
   var pageContent = $modal.find('textarea.wp-editor-area').val();

   var data = {
      action: 'updatePage',
      pageId: pageId,
      pageContent: pageContent
   };

   $.ajax({
      type: 'post',
      url: wpAjax.ajaxUrl,
      data: data
   })
      .done(function() {
      $message
          .find('h2')
          .text('The ' + pageTitle + ' page has been updated successfully!');
   })
      .fail(function() {
      $message
          .find('h2')
          .addClass('error-text')
          .text('There was an error saving the page! Please try again later.');
   })
      .always(function() {
         $message
             .addClass('active')
             .fadeIn(600)
             .delay(2000)
             .fadeOut(800, function() {
               $(this).removeClass('active');
               $(this)
                   .find('h2')
                   .removeClass('errorText')
                   .empty();
            });
      });
}

module.exports = savePage;