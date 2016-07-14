
function openEmbedModal(pageID, pageTitle, previewLink) {
   'use strict';

   var $modal = $('.modal');

   $modal
       .data({
         'p-id': pageID,
         'p-title': pageTitle
      })
       .addClass('page embed')
       .find('.modal-header>h1')
       .text(pageTitle + ': <iframe src="http://www.example.com"></iframe>')
       .end()
       .find('.modal-body')
       .empty()
        .end()
       .find('.modal-footer .close-modal')
       .after('<a class="link btn btn-primary preview" href="' + previewLink + '" rel="noopener" ' +
           'target="_blank">Preview</a>')
       .end()
       .fadeIn(600);

   var $message = $modal.find('.modal-message-overlay');

   $message
       .show()
       .css('opacity', '1')
       .addClass('active')
       .find('h2')
       .text('Loading Page...');

   require('../modal-resize')();
   require('./events/get-page')(pageID);
}

module.exports = openEmbedModal;
