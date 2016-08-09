var getQuestionsForPage = require('./page-table').getQuestions;

// Answers
// Correct
// OptionText
// OR
// Input
// Output
// Hint1
// Hint2
// Hint3
// QuestionCode
// QuestionID
// QuestionName
// QuestionStatement
// QuestionType

function createQuestionRow(questionRow) {
   'use strict';

   var $templates = $('.qa-templates');
   var $question = $templates.find('.js-question-row')
       .clone()
       .children();

   $question
       .data({
         'q-id': questionRow.QuestionID,
         'q-name': questionRow.QuestionName,
         'q-type': questionRow.QuestionType,
         'q-statement': questionRow.QuestionStatement,
         'q-code': questionRow.QuestionCode,
         'q-hint1': questionRow.Hint1,
         'q-hint2': questionRow.Hint2,
         'q-hint3': questionRow.Hint3,
         'q-answers': questionRow.Answers
      })
       .find('.q-name')
       .text(questionRow.QuestionName);

   return $question;
}

function createQuestionRows(pageID, pageTitle, $row, callback) {
   'use strict';

   var $questionTable = $('<div class="qst-table"></div>');
   var $templates = $('.qa-templates');

   var tableHeader = $templates.find('.js-question-hdr')
       .clone()
       .children();

   $questionTable.append(tableHeader);

   if ($row.find('.qa-page-q-count').text() !== '0') {
      getQuestionsForPage(pageID, function(data) {
         for(var i = 0; i < data.length; i++) {
            $questionTable.append(createQuestionRow(data[i]));
         }

         callback(pageID, pageTitle, $questionTable, $row);
      });
   } else {
      callback(pageID, pageTitle, $questionTable, $row);
   }
}

module.exports = {
   createRows: createQuestionRows,
   createRow: createQuestionRow
};
