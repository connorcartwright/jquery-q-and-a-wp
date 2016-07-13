
'use strict';

console.log('modals/modals');

function openEmbedModal(pageID, pageTitle, pageLink) {
   require('./embed-modal/open')(pageID, pageTitle, pageLink);
}

function saveEmbedModal() {
   require('./embed-modal/save')();
}

function openAddQuestionModal(pageID) {
   console.log('open add question modal');
   require('./question-modal/open-add-question')(pageID);
}

function openEditQuestionModal(pageID) {
   require('./question-modal/open-edit-question')(pageID);
}

function setupModals() {
   console.log('setupModals');

   var $qaPlugin = $('.q-and-a-plugin');

   $qaPlugin.on('click', '.js-q-embed>button', function() {
      var row = $(this).closest('.questions');
      var pageLink = row.prev().find('.qa-page-preview a').attr('href');

      openEmbedModal(row.data('p-id'), row.data('p-title'), pageLink);
   })

   .on('click', '.modal .js-save-page', function() {
      saveEmbedModal();
   })

   .on('click', '.js-q-add>button', function() {
      console.log('q add button click');
      var pageID = $(this).closest('.questions').data('p-id');

      openAddQuestionModal(pageID);
   })

   .on('click', '.js-q-edit>button', function() {
      var pageID = $(this).closest('.questions').data('p-id');
      var questionID = '-1';

      openEditQuestionModal()(pageID, questionID);
   })

   .on('click', '.js-modal-close', function() {
      require('./modal-close')();
   });

   // Function setupModal() {
   //
   //     BindMultipleChoiceEvents()
   //     bindCodeAreaEvents()
   // }
}

module.exports = setupModals;

