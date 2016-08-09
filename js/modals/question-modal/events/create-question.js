
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
      questionTypeArea.text = [];
      questionTypeArea.correct = [];

      $('.modal .js-option').each(function() {
         var option = {
            text: $(this).find('input').val(),
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
      action: 'addQuestion',
      pageID: pageID,
      questionID: questionID,
      questionName: questionName,
      questionStatement: questionStatement,
      questionCode: questionCode,
      questionHints: questionHints,
      questionType: questionType,
      questionTypeArea: JSON.stringify(questionTypeArea)
   };

   return data;
}

function postQuestionDetails(callback) {
   'use strict';

   var data = getFields();

   $.ajax({
         url: 'http://localhost:8080',
         method: 'POST',
         data: data,
         dataType: 'json',
         crossDomain: true
      })
       .done(function() {
         console.log('done/success');
      })
       .fail(function() {
         console.log('fail/error');
      })
       .always(function(data) {
         console.log('always');

         return callback(data);
      });
}

module.exports = postQuestionDetails;