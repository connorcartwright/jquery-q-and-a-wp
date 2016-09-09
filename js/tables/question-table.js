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

function setRowData($row, data) {
   'use strict';

   var url = 'http://SERVER_IP:PORT/questions/page-' + data.pageID + '/' + data.questionID + '.html';

   $row
      .data({
      'q-id': data.questionID,
      'q-name': data.questionName,
      'q-type': data.questionType,
      'q-statement': data.questionStatement,
      'q-code': data.questionCode,
      'q-hint1': data.hint1,
      'q-hint2': data.hint2,
      'q-hint3': data.hint3,
      'q-answers': data.answers,
      'q-url': url
   })
      .find('.q-name')
      .text(data.questionName);

   $row.find('.js-q-preview a').attr('href', url);

   return $row;
}

function createQuestionRow(data) {
   'use strict';

   var $templates = $('.qa-templates');
   var $question = $templates.find('.js-question-row')
       .clone()
       .children();

   return setRowData($question, data);
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
            data[i].pageID = pageID;
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
   createRow: createQuestionRow,
   setRowData: setRowData
};
