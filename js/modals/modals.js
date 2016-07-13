
'use strict';

function openEmbedModal(pageID, pageTitle, pageLink) {
   require('./embed_modal/open')(pageID, pageTitle, pageLink);
}

function saveEmbedModal() {
   require('./embed_modal/save')();
}

$('.q-and-a-plugin').on('click', '.js-q-embed>button', function() {
   var row = $(this).closest('.questions');
   var pageLink = row.prev().find('.qa-page-preview a').attr('href');

   openEmbedModal(row.data('p-id'), row.data('p-title'), pageLink);
});

$('.q-and-a-plugin').on('click', '.modal .js-save-page', function() {
   saveEmbedModal();
});

$('.q-and-a-plugin').on('click', '.js-modal-close', function() {
   require('./modal-close')();
});
