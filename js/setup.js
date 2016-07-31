$(function() {
   'use strict';

   jQuery.ajaxSettings.traditional = true;

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

   function getQuestionCount(pageID, callback) {
      var data = {
         action: 'getQuestionCount',
         id: pageID
      };

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

         return callback(data.pageCount);
      });
   }

   function addPagesToDatabase() {
      for(var i = 0; i < pages.length; i++) {
         addPageToDatabase(pages[i]);
      }
   }

   addPagesToDatabase();

   function createPageRow(i) {
      var $templates = $('.qa-templates');
      var page = pages[i];

      var $row = $templates.find('.js-page-row')
          .clone()
          .children();

      $row
          .data({
            'p-id': page[0],
            'p-title': page[1]
         })
          .find('.qa-page-id>span')
          .text(page[0])
          .end()
          .find('.qa-page-title>span')
          .text(page[1])
          .end()
          .find('.qa-page-preview>a')
          .attr('href', page[2])
          .end();

      getQuestionCount(page[0], function(data) {
         $row
             .find('.qa-page-q-count')
             .text(data);
      });

      return $row;
   }

   function createPageRows() {
      var $rows = $('');

      for(var i = 0; i < pages.length; i++) {
         $rows = $rows.add(createPageRow(i));
      }

      return $rows;
   }

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

   function createQuestionRow(questionRow) {
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
            'q-hint1': questionRow.Hint1,
            'q-hint2': questionRow.Hint2,
            'q-hint3': questionRow.Hint3,
            'q-answers': questionRow.Answers
         })
          .find('.q-name')
          .text(questionRow.QuestionName);

      return $question;
   }

   function getQuestionsForPage(pageID, callback) {
      var data = {
         action: 'getQuestionsForPage',
         id: pageID
      };

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

            return callback(data.questions);
         });
   }

   function createQuestionRows(pageID, pageTitle, $row, callback) {
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

   setup();

   // $('.q-and-a-plugin').on('click', '.q-delete>button', function() {
   //     questionDeleteButtonClick(); // question_id
   // });
});
