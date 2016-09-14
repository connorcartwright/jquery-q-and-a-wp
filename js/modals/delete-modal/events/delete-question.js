
var closeModal = require('../../modal').closeModal;

function updateQuestionTableHeight() {
   'use strict';

   $('.blank-row').height($('.questions').height());
}

function deleteQuestion($questionRow, questionID) {
   'use strict';

   var $pageRow = $questionRow.closest('.questions').prev();

   var pageID = $pageRow.find('.qa-page-id span').text();

   var data = {
      action: 'deleteQuestion',
      questionID: questionID,
      pageID: pageID,
      accessToken: accessToken
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

         var questionCount = $pageRow.find('.qa-page-q-count').text();

         $pageRow
             .find('.qa-page-q-count')
             .text(parseInt(questionCount) - 1);

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
