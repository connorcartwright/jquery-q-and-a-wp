
var closeModal = require('../../modal').closeModal;

function updatePageCount($questionRow) {
   'use strict';

   var $pageRow = $questionRow.closest('.questions').prev();

   var questionCount = $pageRow.find('.qa-page-q-count').text();

   $pageRow
       .find('.qa-page-q-count')
       .text(parseInt(questionCount) - 1);
}

function updateQuestionTableHeight() {
   'use strict';

   $('.blank-row').height($('.questions').height());
}

function deleteQuestion($questionRow, questionID) {
   'use strict';

   var data = {
      action: 'deleteQuestion',
      questionID: questionID
   };

   $.ajax({
      url: 'http://SERVER_IP:PORT',
      method: 'POST',
      data: data,
      dataType: 'json',
      crossDomain: true
   })
       .done(function() {
         console.log('delete question done');

         updatePageCount($questionRow);
         $questionRow.remove();
         updateQuestionTableHeight();
         closeModal();
      })
       .fail(function() {
         console.log('fail/error');
      })
       .always(function() {
         console.log('delete question always');
      });
}

module.exports = deleteQuestion;
