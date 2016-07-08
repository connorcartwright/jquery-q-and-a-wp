$(function() {
   'use strict';

   function createPageTable() {
      var $pageTable = $('<div class="qa-tbl"></div>');
      var $templates = $('.qa-templates');
      var tableHeader = $templates.find('.js-page-hdr')
          .clone()
          .children();

      $pageTable.append(tableHeader);

      for(var i = 0; i < pages.length; i++) {
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
             .find('.qa-page-q-count')
               .text('0')
             .end()
             .find('.qa-page-preview>a')
               .attr('href', page[2])
             .end();

         $pageTable.append($row);
      }

      return $pageTable;
   }

   function createModal() {
      var $modal = $('.qa-templates .js-modal')
          .clone()
          .children();

      $modal.attr('class', 'modal');

      return $modal;
   }

   function createQuestionRow() {
      var $templates = $('.qa-templates');
      var $question = $templates.find('.js-question-row')
          .clone()
          .children();

      return $question;
   }

   function pageRowClick($row, pageId, pageTitle) {
      // If the questions for this page are open
      if ($row.next().hasClass('questions')) {
         $('.questions, .blank-row').slideUp(400, function() {
            $row
                .next()
                .remove();
         });
      } else {
         $('.questions, .blank-row').remove();
         var $questions = $('<div class="questions" data-p-id="' + pageId + '" data-p-title="' + pageTitle + '"></div></div>');
         var $questionTable = $('<div class="qst-table"></div>');
         var $templates = $('.qa-templates');

         var tableHeader = $templates.find('.js-question-hdr')
             .clone()
             .children();

         $questionTable.append(tableHeader);

         for(var i = 0; i < 5; i++) {
            $questionTable.append(createQuestionRow());
         }

         $questionTable.append($templates.find('.js-question-add').clone().children());

         var $blankSpace = $('<div class="qa-tbl-row blank-row"></div>');

         $row.after($questions);
         $questions.append($questionTable).after($blankSpace);
         $blankSpace.height($questions.height());
         $questions.add($blankSpace).hide().slideDown(600);
      }
   }

   function setup() {
      var $pluginBody = $('<div class="plugin-body"></div>');

      $pluginBody.append('<h1 class="plugin-header">Learning Center Pages</h1>');
      $pluginBody.append(createPageTable());
      $('#q-and-a-plugin').append($pluginBody);
      $('#q-and-a-plugin').append(createModal());

      // Stop click of the preview opening/closing a row
      $('.page-preview').click(function(e) {
         e.stopPropagation();
      });

      $('#q-and-a-plugin').on('click', '.qa-tbl-row.page', function() {
         pageRowClick($(this), $(this).data('p-id'), $(this).data('p-title'));
      });
   }

   setup();

   // $('#q-and-a-plugin').on('click', '.q-delete>button', function() {
   //     questionDeleteButtonClick(); // question_id
   // });
});
