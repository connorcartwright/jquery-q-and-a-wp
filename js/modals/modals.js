
'use strict';

function openEmbedModal(pageID, pageTitle, pageLink) {
   require('./embed-modal/open')(pageID, pageTitle, pageLink);
}

function savePage() {
   require('./embed-modal/events/save-page')();
}

function openQuestionModal(pageID, questionData) {
   require('./question-modal/open-question')(pageID, questionData);
}

function updateTypeArea(questionType, questionAnswers) {
   require('./question-modal/edit-question-type')(questionType, questionAnswers);
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

      openQuestionModal(pageID);
   })
   .on('click', '.js-q-edit>button', function() {
      var $questionRow = $(this).closest('.qa-tbl-row.question');
      var pageID = $(this).closest('.questions').data('p-id');

      var questionData = {
         questionID: $questionRow.data('q-id'),
         questionName: $questionRow.data('q-name'),
         questionType: $questionRow.data('q-type'),
         questionStatement: $questionRow.data('q-statement'),
         questionHint1: $questionRow.data('q-hint1'),
         questionHint2: $questionRow.data('q-hint2'),
         questionHint3: $questionRow.data('q-hint3'),
         questionAnswers: $questionRow.data('q-answers')
      };

      openQuestionModal(pageID, questionData);
      updateTypeArea($questionRow.data('q-type'), $questionRow.data('q-answers'));
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

