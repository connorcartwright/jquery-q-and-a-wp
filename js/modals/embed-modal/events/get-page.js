function getPage(pageID) {
   'use strict';

   var $modal = $('.modal');
   var $message = $modal.find('.modal-message-overlay');

   var data = {
      action: 'embedQuestion',
      pageId: pageID
   };

   $.ajax({
         type: 'post',
         url: wpAjax.ajaxUrl,
         data: data
      })
       .done(function(data) {
         $modal
             .find('.modal-body')
             .html(data)
             .end()
             .find('.modal-footer .btn-success')
             .addClass('js-save-page')
             .text('Save')
             .end();

         $message.fadeOut(600, function() {
            $(this)
                .removeClass('active')
                .find('h2')
                .empty();
         });
      })
       .fail(function() {
         $message
           .addClass('active')
             .find('h2')
             .addClass('error-text')
             .text('There was an error loading the page! Please try again later.')
             .end()
             .delay(1000)
             .fadeTo(600, 0, function() {
               $(this).removeClass('active');
               $(this)
                   .find('h2')
                   .removeClass('error-text');
               require('../../modal-close')();
            });
      });
}

module.exports = getPage;