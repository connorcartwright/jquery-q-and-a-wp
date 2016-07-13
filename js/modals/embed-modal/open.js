
function openEmbedModal(pageId, pageTitle, previewLink) {
   'use strict';

   var $modal = $('.modal');
   var data = {
      action: 'embedQuestion',
      pageId: pageId
   };

   $.ajax({
         type: 'post',
         url: wpAjax.ajaxUrl,
         data: data
      })
       .done(function(data) {
         console.log(data);
         console.log('success - get edit page');
      })
       .fail(function() {
         console.log('error - get edit page');
      })
       .always(function(data) {
         console.log('always - get edit page');
         $modal
             .data({
               'p-id': pageId,
               'p-title': pageTitle
            })
             .addClass('page embed')
             .find('.modal-header>h1')
             .text(pageTitle + ': <iframe src="http://www.example.com"></iframe>')
             .end()
             .find('.modal-body')
             .html(data)
             .end()
             .find('.modal-footer .close-modal')
             .after('<a class="link btn btn-primary preview" href="' + previewLink + '" rel="noopener" ' +
                 'target="_blank">Preview</a>')
             .end()
             .find('.modal-footer .btn-success')
             .addClass('js-save-page')
             .text('Save')
             .end()
             .fadeIn(600);

         $('body').css('overflow', 'hidden');
         require('../modal-resize')();
      });
}

module.exports = openEmbedModal;
