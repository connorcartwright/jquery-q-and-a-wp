
'use strict';

function openEmbedModal(pageID, pageTitle, pageLink) {
   require('./embed-modal/open')(pageID, pageTitle, pageLink);
}

function savePage() {
   require('./embed-modal/events/save-page')();
}

function openAddQuestionModal(pageID) {
   require('./question-modal/open-add-question')(pageID);
}

function openEditQuestionModal(pageID) {
   require('./question-modal/open-edit-question')(pageID);
}

function setupModals() {
   var $qaPlugin = $('.q-and-a-plugin');

   $qaPlugin.on('click', '.js-q-embed>button', function() {
      var row = $(this).closest('.questions');
      var pageLink = row.prev().find('.qa-page-preview a').attr('href');

      openEmbedModal(row.data('p-id'), row.data('p-title'), pageLink);
   })

   .on('click', '.modal .js-save-page', function() {
      savePage();
   })

   .on('click', '.js-q-add>button', function() {
      var pageID = $(this).closest('.questions').data('p-id');

      openAddQuestionModal(pageID);
   })

   .on('click', '.js-q-edit>button', function() {
      var pageID = $(this).closest('.questions').data('p-id');
      var questionID = '-1';

      openEditQuestionModal()(pageID, questionID);
   })

   // $('.q-and-a-plugin').on('click', '.q-preview>button', function() {
   //     var row = $(this).closest('.questions')
   //     questionPreviewButtonClick(row.data('p-id'), row.data('p-title'))
   // })

   .on('click', '.js-modal-close', function() {
      require('./modal-close')();
   });
}

module.exports = setupModals;

