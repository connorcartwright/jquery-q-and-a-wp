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
      return $('<div class="modal"><div class="modal-overlay"></div><div class="modal-content"><div class="modal-close">' +
          '<span class="glyphicon glyphicon-remove"></span></div><div class="modal-header"><h1></h1></div><div class="modal-body"></div>' +
          '<div class="modal-footer"><div class="modal-footer-buttons"><button class="btn btn-default close-modal">Close</button>' +
          '<button class="btn btn-success">Save</button></div></div></div></div>');
   }

   function createQuestionRow() {
      var $question = $('<div class="qa-tbl-row question"></div>');

      var questionName = '<div class="q-name"><span>How to use $(#my-element).after</span></div>';
      var embedButton = '<div class="q-embed qa-center"><button type="button" class="btn btn-default">' +
          '<span class="glyphicon glyphicon-link"></span></button></td>';
      var editButton = '<div class="q-edit qa-center"><button type="button" class="btn btn-primary">' +
          '<span class="glyphicon glyphicon-pencil"></span></button></div>';
      var previewButton = '<div class="q-preview qa-center"><button type="button" class="btn btn-success">' +
          '<span class="glyphicon glyphicon-eye-open"></span></button><div/>';
      var deleteButton = '<div  class="q-delete qa-center"><button type="button" class="btn btn-danger">' +
          '<span class="glyphicon glyphicon-remove"></span></button></div>';

      $question
          .append(questionName)
          .append(embedButton)
          .append(editButton)
          .append(previewButton)
          .append(deleteButton);

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

         $questionTable.append('<div class="qa-tbl-row qa-tbl-hdr"><div class="q-name"><span>Question Name</span></div>' +
             '<div class="q-embed qa-center"><span>Embed</span></div><div class="q-edit qa-center"><span>Edit</span></div>' +
             '<div class="q-preview qa-center"><span>Preview</span></div><div class="q-delete qa-center"><span>Delete</span></div></div>');

         for(var i = 0; i < 5; i++) {
            $questionTable.append(createQuestionRow());
         }

         var addButton = '<div class="qa-tbl-row question"><div class="q-add"><button type="button" class="btn btn-success">' +
             '<span class="glyphicon glyphicon-plus"></span></button></div>';

         $questionTable.append(addButton);

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
