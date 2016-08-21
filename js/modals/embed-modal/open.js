'use strict';

var modalResize = require('../modal').resizeModalBody;
var getPage = require('./events/get-page');

function openEmbedModal(pageID, pageTitle, questionUrl, previewLink) {
   var $modal = $('.modal');

   $modal
       .data({
         'p-id': pageID,
         'p-title': pageTitle
      })
       .addClass('page embed')
       .find('.modal-header>h1')
       .text(pageTitle + ': <iframe src="' + questionUrl + '" frameborder="0"></iframe>')
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

   modalResize();
   getPage(pageID);
}

module.exports = openEmbedModal;