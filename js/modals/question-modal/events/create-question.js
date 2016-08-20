
function getFields() {
   'use strict';

   var questionID = $('.modal').data('q-id');
   var pageID = $('.modal').data('p-id');
   var questionName = $('.modal #q-name-input').val();
   var questionStatement = $('.modal #q-statement-input').val();
   var questionHints = [];
   var questionTypeArea = [];

   $('.modal .hint').each(function() {
      questionHints.push($(this).data('hint-text'));
   });

   var questionType = $('.modal #q-type-select').find('option:selected').text();

   var questionCode = '';

   if (questionType === 'Multiple Choice') {
      questionTypeArea.optionText = [];
      questionTypeArea.correct = [];

      $('.modal .js-option').each(function() {
         var option = {
            optionText: $(this).find('input').val(),
            correct: $(this).find('input').hasClass('wrong') ? 0 : 1
         };

         questionTypeArea.push(option);
      });
   } else {
      var editor = ace.edit('qa-code-editor');

      questionCode = editor.getValue();
      $('.modal .input-output-button').each(function() {
         var inputOutput = {
            input: $(this).data('input'),
            output: $(this).data('output')
         };

         questionTypeArea.push(inputOutput);
      });
   }

   var data = {
      action: questionID ? 'editQuestion' : 'addQuestion',
      pageID: pageID,
      questionID: questionID,
      questionName: questionName,
      questionStatement: questionStatement,
      questionCode: questionCode,
      questionHints: questionHints,
      questionType: questionType,
      answers: JSON.stringify(questionTypeArea),
      accessToken: accessToken
   };

   return data;
}

function postQuestionDetails(callback) {
   'use strict';

   console.log('before post details ajax request');

   var postData = getFields();

   $.ajax({
         url: 'https://cryptic-sands-74858.herokuapp.com',
         method: 'POST',
         data: postData,
         dataType: 'json',
         crossDomain: true
      })
       .done(function() {
         console.log('done/success');
         var $row = $('.questions').prev();
         var currentCount = $row
             .find('.qa-page-q-count')
             .text();

         currentCount++;

         $row
             .find('.qa-page-q-count')
             .html(currentCount);
      })
       .fail(function() {
         console.log('fail/error');
      })
       .always(function(data) {
         console.log('always');

         if (!postData.questionID) {
            postData.questionID = data.questionID;
         }

         return callback(postData);
      });
}

module.exports = postQuestionDetails;