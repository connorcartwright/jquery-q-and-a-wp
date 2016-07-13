
function savePage() {
   'use strict';

   var $modal = $('.modal');
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
         dataType: 'json',
         url: wpAjax.ajaxUrl,
         data: data
      })
       .done(function(data) {
         console.log('success - update page');
         console.log(data);
      })
       .fail(function() {
         console.log('error - update page');
      })
       .always(function(data) {
         console.log('always - update page');
         console.log(data);
         var $message = $('<div class="modal-message-overlay"><div class="modal-message-content">' +
             '<h2>The ' + pageTitle + ' page has been updated successfully!</h2></div></div>');

         $modal.find('.modal-content').append($message);

         $message
             .hide()
             .fadeIn(600)
             .delay(2200)
             .fadeOut(800, function() {
               $message.remove();
            });
      });
}

module.exports = savePage;
