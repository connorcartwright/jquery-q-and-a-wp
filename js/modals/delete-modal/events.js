var deleteQuestion = require('./events/delete-question');

function bindDeleteQuestion() {
   'use strict';

   $('.q-and-a-plugin').on('click', ' .modal .js-delete-question', function() {
         var questionID = $('.modal').data('q-id');

         var $questionRows = $('.plugin-body').find('.qa-tbl-row.question');
         var $questionRow;

         $questionRows.each(function() {
            if ($(this).data('q-id') === questionID) {
               $questionRow = $(this);

               deleteQuestion($questionRow, questionID);

               return false;
            }
         });
      });
}

function bindEvents() {
   'use strict';

   bindDeleteQuestion();
}

module.exports = bindEvents;