'use strict';

var savePage = require('./embed-modal/events/save-page');
var openEmbedModal = require('./embed-modal/open');
var openQuestionModal = require('./question-modal/open-question');
var updateTypeArea = require('./question-modal/edit-question-type');
var closeModal = require('./modal-close');

function setupModals() {
   var $qaPlugin = $('.q-and-a-plugin');

   $qaPlugin.on('click', '.js-q-embed>button', function() {
      var row = $(this).closest('.questions');
      var pageLink = row.prev().find('.qa-page-preview a').attr('href');

      openEmbedModal(row.data('p-id'), row.data('p-title'), pageLink);
   })
   .on('click', '.modal .js-save-page', savePage)
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

   .on('click', '.js-modal-close', closeModal);
}

module.exports = setupModals;