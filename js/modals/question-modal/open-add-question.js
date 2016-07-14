$(function() {
   'use strict';

   function createHints() {
      var $templates = $('.qa-templates');
      var hints = $templates.find('.js-modal-question .js-hints')
          .clone()
          .children();

      return hints;
   }

   function createQuestionForm() {
      var $templates = $('.qa-templates');

      var $questionForm = $templates
          .find('.js-modal-question .js-form')
          .clone()
          .children();

      $questionForm.append(createHints());

      return $questionForm;
   }

   require('./events.js')();

   function openAddQuestionModal(pageID) {
      var $modal = $('.modal');

      $modal
          .data('p-id', pageID)
          .addClass('question')
          .find('.modal-header h1')
          .text('Add Question')
          .end()
          .find('.modal-footer .btn-success')
          .attr('class', 'btn btn-success js-create-question')
          .text('Create');

      var $modalBody = $modal.find('.modal-body');

      $modalBody
          .empty()
          .html(createQuestionForm());

      $modal.fadeIn(600);
      $('body').css('overflow', 'hidden');
      require('../modal-resize')();
   }

   module.exports = openAddQuestionModal;
});
