var resizeModalBody = require('../modal').resizeModalBody;
var events = require('./events.js');

events();

function createHints(hint1, hint2, hint3) {
   'use strict';

   var $templates = $('.qa-templates');
   var $hints = $templates.find('.js-modal-question .js-hints')
       .clone()
       .children();

   if (hint1) {
      var $hintsTextarea = $hints.find('.js-hints-textarea');

      $hintsTextarea.text(hint1);

      $hints
          .find('.js-hint-1').data('hint-text', hint1)
          .end()
          .find('.js-hint-2').data('hint-text', hint2)
          .end()
          .find('.js-hint-3').data('hint-text', hint3)
          .end();
   }

   return $hints;
}

function createQuestionForm(questionData) {
   'use strict';

   var $templates = $('.qa-templates');

   var $questionForm = $templates
       .find('.js-modal-question .js-form')
       .clone()
       .children();

   if (questionData) {
      $questionForm
          .find('.js-question-name-input')
          .val(questionData.questionName)
          .end()
          .end()
          .find('.js-question-statement-input')
          .val(questionData.questionStatement)
          .end();

      $questionForm.append(createHints(questionData.questionHint1, questionData.questionHint2, questionData.questionHint3));
   } else {
      $questionForm.append(createHints());
   }

   return $questionForm;
}

function openQuestionModal(pageID, questionData) {
   'use strict';

   var $modal = $('.modal');

   $modal
       .data({
         'p-id': pageID,
         'q-id': questionData ? questionData.questionID : ''
      })
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
       .html(createQuestionForm(questionData));

   if ($modal.hasClass('edit')) {
      $modal
          .find('.btn-success')
          .text('Update')
          .end()
          .find('h1')
          .text('Update Question');
   }

   $modal.fadeIn(600);
   $('body').css('overflow', 'hidden');
   resizeModalBody();
}

module.exports = openQuestionModal;
