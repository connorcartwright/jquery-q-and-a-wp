'use strict';

jQuery.ajaxSettings.traditional = true;

var createQuestionRows = require('./tables/question-table').createRows;
var createPageRows = require('./tables/page-table').createPageRows;

require('./modals/modals')();

function addPageToDatabase(page) {
   var data = {
      action: 'addPage',
      id: page[0],
      title: page[1]
   };

   $.ajax({
      url: 'http://localhost:8080',
      method: 'POST',
      data: data,
      dataType: 'json',
      crossDomain: true
   });
}

function addPagesToDatabase() {
   for(var i = 0; i < pages.length; i++) {
      addPageToDatabase(pages[i]);
   }
}

addPagesToDatabase();

function createPageTable() {
   var $pageTable = $('<div class="qa-tbl"></div>');
   var $templates = $('.qa-templates');
   var tableHeader = $templates.find('.js-page-hdr')
       .clone()
       .children();

   $pageTable.append(tableHeader);
   $pageTable.append(createPageRows());

   return $pageTable;
}

function createModal() {
   var $modal = $('.qa-templates .js-modal')
       .clone()
       .children();

   $modal.attr('class', 'modal');

   return $modal;
}

function finishQuestionTable(pageID, pageTitle, $questionTable, $row) {
   var $templates = $('.qa-templates');
   var $questions = $('<div class="questions" data-p-id="' + pageID + '" data-p-title="' + pageTitle + '"></div></div>');

   $questionTable.append($templates.find('.js-question-add').clone().children());

   var $blankSpace = $('<div class="qa-tbl-row blank-row"></div>');

   $row.after($questions);
   $questions.append($questionTable).after($blankSpace);
   $blankSpace.height($questions.height());
   $questions.add($blankSpace).hide().slideDown(600);
}

function pageRowClick($row, pageID, pageTitle) {
   // If the questions for this page are open
   if ($row.next().hasClass('questions')) {
      $('.questions, .blank-row').slideUp(400, function() {
         $row
             .next()
             .remove();
      });
   } else {
      $('.questions, .blank-row').remove();
      createQuestionRows(pageID, pageTitle, $row, finishQuestionTable);
   }
}

function setup() {
   var $pluginBody = $('<div class="plugin-body"></div>');

   $pluginBody.append('<h1 class="plugin-header">Learning Center Pages</h1>');
   $pluginBody.append(createPageTable());
   $('.q-and-a-plugin').append($pluginBody);
   $('.q-and-a-plugin').append(createModal());

   // Stop click of the preview opening/closing a row
   $('.page-preview').click(function(e) {
      e.stopPropagation();
   });

   $('.q-and-a-plugin').on('click', '.js-qa-page-row', function() {
      pageRowClick($(this), $(this).data('p-id'), $(this).data('p-title'));
   });
}

module.exports = setup();

// $('.q-and-a-plugin').on('click', '.q-delete>button', function() {
//     questionDeleteButtonClick(); // question_id
// });
