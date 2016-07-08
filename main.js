/*! jquery-q-and-a.js 1.0.0 | Connor Cartwright (@ConnorCartwright)*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function() {
   'use strict';

   function questionEmbedButtonClick(pageId, pageTitle, previewLink) {
      var $modal = $('.modal');
      var data = {
         action: 'embedQuestion',
         pageId: pageId
      };

      $.ajax({
            type: 'post',
            url: wpAjax.ajaxUrl,
            data: data
         })
          .done(function(data) {
            console.log(data);
            console.log('success - get edit page');
         })
          .fail(function() {
            console.log('error - get edit page');
         })
          .always(function(data) {
            console.log('always - get edit page');
            $modal
                .data({
                  'p-id': pageId,
                  'p-title': pageTitle
               })
                .addClass('page embed')
                .find('.modal-header>h1')
                .text(pageTitle + ': <iframe src="http://www.example.com"></iframe>')
                .end()
                .find('.modal-body')
                .html(data)
                .end()
                .find('.modal-footer .close-modal')
                .after('<button class="btn btn-primary preview"><a href="' + previewLink + '" rel="noopener" ' +
                    'target="_blank">Preview</a></button>')
                .end()
                .find('.modal-footer .btn-success')
                .addClass('save')
                .text('Save')
                .end()
                .fadeIn(600);

            $('body').css('overflow', 'hidden');
            require('./modal-resize')();
         });
   }

   function savePage() {
      var $modal = $('.modal');
      var pageId = $modal.data('p-id');
      var pageTitle = $modal.data('p-title');
      var pageContent = $modal.find('textarea.wp-editor-area').val();

      var data = {
         action: 'updatePage',
         pageId: pageId,
         pageContent: pageContent
      };

      $.ajax({
            type: 'post',
            dataType: 'json',
            url: wpAjax.ajaxUrl,
            data: data
         })
          .done(function(data) {
            console.log('success - update page');
            console.log(data);
         })
          .fail(function() {
            console.log('error - update page');
         })
          .always(function(data) {
            console.log('always - update page');
            console.log(data);
            var $message = $('<div class="modal-message-overlay"><div class="modal-message-content">' +
                '<h2>The ' + pageTitle + ' page has been updated successfully!</h2></div></div>');

            $modal.find('.modal-content').append($message);

            $message
                .hide()
                .fadeIn(600)
                .delay(2200)
                .fadeOut(800, function() {
                  $message.remove();
               });
         });
   }

   $('#q-and-a-plugin').on('click', '.q-embed>button', function() {
      var row = $(this).closest('.questions');
      var previewLink = row.prev().find('.qa-page-preview a').attr('href');

      questionEmbedButtonClick(row.data('p-id'), row.data('p-title'), previewLink);
   });

   $('#q-and-a-plugin').on('click', '.modal .save', function() {
      savePage();
   });
});

},{"./modal-resize":3}],2:[function(require,module,exports){
function closeModal() {
   'use strict';

   if (!getSelection().toString()) {
      var $modal = $('.modal');

      $modal.fadeOut(600, function() {
         if ($modal.hasClass('page')) {
            $modal
                .find('.preview')
                .remove();
         }

         $modal
             .attr('class', 'modal')
             .find('.modal-footer .btn-success')
             .attr('class', 'btn btn-success');
      });
      $('body').css('overflow', 'auto');
   }
}

module.exports = closeModal;

},{}],3:[function(require,module,exports){
function resizeModalBody() {
   'use strict';

   var modalHeight = $('.modal .modal-content').height();
   var modalHeaderHeight = $('.modal .modal-header').outerHeight(true);
   var modalFooterHeight = $('.modal .modal-footer').outerHeight(true);

   $('.modal .modal-body').height(modalHeight - (modalHeaderHeight + modalFooterHeight));
}

module.exports = resizeModalBody;

},{}],4:[function(require,module,exports){



},{}],5:[function(require,module,exports){
$(function() {
   'use strict';

   function hintButtonClick($button) {
      if (!$button.hasClass('active')) {
         console.log('hint click, not active');
         console.log('data hint: ' + $button.data('hint'));

         $('fieldset.hints .hint.active').data('hint-text', $('fieldset.hints textarea').val());
         $('fieldset.hints textarea').val($button.data('hint-text'));
         $('fieldset.hints textarea').attr('placeholder', 'Hint ' + $button.data('hint'));
         $('.hint.active>span').text($('.hint.active').data('hint'));
         $('.hint.active').removeClass('active');

         $button
             .addClass('active')
             .find('span')
             .text('Hint ' + $button.data('hint'));

         $('fieldset.hints textarea').focus();
      }
   }

   function createHints() {
      var $hints = $('<fieldset class="form-group hints"> <label>Hints </label></fieldset>');
      var hintButton1 = '<button type="button" class="btn btn-default hint hint-1 active" data-hint="1"><span>Hint 1</span></button>';
      var hintButton2 = '<button type="button" class="btn btn-default hint hint-2" data-hint="2"><span>2</span></button>';
      var hintButton3 = '<button type="button" class="btn btn-default hint hint-3" data-hint="3"><span>3</span></button>';
      var $hintTextarea = $('<textarea class="form-control" id="q-statement-input" rows="3" placeholder="Hint 1"></textarea>');

      $hints
          .append(hintButton1)
          .append(hintButton2)
          .append(hintButton3)
          .append($hintTextarea);

      $hintTextarea.on('keyup', function() {
         $('.hint.active').data('hint-text', $(this).val());
      });

      $('.modal').on('click', '.hint', function() {
         hintButtonClick($(this));
      });

      return $hints;
   }

   function createMultipleChoiceOptions(n) {
      var $r = $('');

      for(var i = 0; i < n; i++) {
         var input = '<input type="text" class="form-control wrong" id="q-mc-option-' + i + '" placeholder="Option ' +
             (i + 1 + $('.mc-text-option').length) + ' Text">';

         var option = '<fieldset class="form-group mc-text-option"><div class="input-group input">' + input +
             '<div class="input-group-addon correct-answer"><button type="button" class="btn btn-default mc-correct-answer">' +
             '<span class="glyphicon glyphicon-ok"></span></button></div></div></div></fieldset>';

         $r = $r.add(option);
      }

      return $r;
   }

   function createMultipleChoiceArea() {
      $('.question-type-area').attr('class', 'question-type-area multiple-choice');

      var $addRemoveOptions = $('<fieldset class="form-group mc-option-change">' +
          '<button type="button" class="btn btn-default mc-remove-option"><span class="glyphicon glyphicon-minus"></span></button>' +
          '<button type="button" class="btn btn-default mc-add-option"><span class="glyphicon glyphicon-plus"></span></button></fieldset>');

      return $addRemoveOptions.add(createMultipleChoiceOptions(4));
   }

   function correctButtonClick(button) {
      var input = button.closest('.input-group').find('input');

      if (input.hasClass('wrong')) {
         input.removeClass('wrong').addClass('correct');
         button.addClass('btn-success').removeClass('btn-default');
      } else {
         input.removeClass('correct').addClass('wrong');
         button.removeClass('btn-success').addClass('btn-default');
      }
   }

   function bindMultipleChoiceEvents() {
      $('#q-and-a-plugin').on('click', '.mc-add-option', function() {
         $('fieldset.mc-text-option').last().after(createMultipleChoiceOptions(1));
      });

      $('#q-and-a-plugin').on('click', '.mc-remove-option', function() {
         if ($('.mc-text-option').length > 2) {
            $('.mc-text-option').last().remove();
         }
      });

      $('#q-and-a-plugin').on('click', '.correct-answer', function() {
         correctButtonClick($(this));
      });
   }

   function createCodeArea() {
      $('.question-type-area').attr('class', 'question-type-area coding');
      var $editor = $('<div id="editor" class="code-editor mc-code">// Enter your code here</div>');
      var $io = $('<fieldset class="form-group input-output"> <label>Input / Output </label></fieldset>');
      var $removeIo = $('<button type="button" class="btn btn-default remove-io"><span class="glyphicon glyphicon-minus"></span></button>');
      var $addIo = $('<button type="button" class="btn btn-default add-io"><span class="glyphicon glyphicon-plus"></span></button>');
      var io1 = '<button type="button" class="btn btn-default io active" data-io="1"><span>IO 1</span></button>';
      var io2 = '<button type="button" class="btn btn-default io" data-io="2"><span>2</span></button>';
      var io3 = '<button type="button" class="btn btn-default io" data-io="3"><span>3</span></button>';
      var $inputTextarea = $('<textarea class="form-control" id="input-textarea" rows="3" placeholder="Question Input 1"></textarea>');
      var $outputInput = $('<input type="text" id="output-input" class="form-control" placeholder="Expected Output 1">');

      $io
          .append($removeIo)
          .append($addIo)
          .append(io1)
          .append(io2)
          .append(io3)
          .append($inputTextarea)
          .append($outputInput);

      return $editor.add($io);
   }

   function ioButtonClick(button) {
      if (!button.hasClass('active')) {
         $('fieldset.input-output .io.active').data('input', $('fieldset.input-output textarea').val());
         $('fieldset.input-output .io.active').data('output', $('fieldset.input-output input').val());
         $('fieldset.input-output textarea').val(button.data('input'));
         $('fieldset.input-output input').val(button.data('output'));
         $('fieldset.input-output textarea').attr('placeholder', 'Question Input ' + button.data('io'));
         $('fieldset.input-output input').attr('placeholder', 'Expected Output ' + button.data('io'));
         $('.io.active>span').text($('.io.active').data('io'));
         $('.io.active').removeClass('active');

         button
             .addClass('active')
             .find('span')
             .text('IO ' + button.data('io'));

         $('fieldset.input-output textarea').focus();
      }
   }

   function bindCodeAreaEvents() {
      $('.modal').on('click', '.remove-io', function() {
         if ($('.io').length > 3) {
            $('.io').last().remove();
         }
      });

      $('.modal').on('click', '.add-io', function() {
         var ioLength = $('.io').length;

         if (ioLength < 8) {
            var ioCount = ioLength + 1;
            var newIo = '<button type="button" class="btn btn-default io" data-io="' + ioCount + '"><span>' + ioCount + '</span></button>';

            $('.io')
                .last()
                .after(newIo);
         }
      });

      $('.modal').on('click', '.io', function() {
         ioButtonClick($(this));
      });

      $('.modal').on('keyup', '#input-textarea', function() {
         $('.io.active').data('input', $(this).val());
      });

      $('.modal').on('keyup', '#output-input', function() {
         $('.io.active').data('output', $(this).val());
      });
   }

   function questionTypeChange(type) {
      $('.modal *').removeClass('error');

      switch(type) {
         case 'Multiple Choice':
            return createMultipleChoiceArea();
         default:
            return createCodeArea();
      }
   }

   function createQuestionForm() {
      var $questionForm = $('<form></form>');
      var questionName = '<fieldset class="form-group"> <label for="q-name-input">Question Name </label>' +
          '<input type="text" id="q-name-input" class="form-control" placeholder="Question Name"></fieldset>';
      var $questionType = $('<fieldset class="form-group"> <label for="q-type-select">Question Type </label></fieldset>');
      var questionStatement = '<fieldset class="form-group"> <label for="q-statement-input">Question Statement</label>' +
          '<textarea class="form-control" id="q-statement-input" rows="3" placeholder="Question Statement"></textarea></fieldset>';
      var $typeSelect = $('<select class="form-control" id="q-type-select"><option>Multiple Choice</option>' +
          '<option>Bug Fix</option><option>Missing Code</option><option>Complete Code</option></select>');
      var $questionTypeArea = $('<div class="question-type-area multiple-choice"></div>');

      $questionTypeArea.html(questionTypeChange($typeSelect.find('option:selected').text()));

      $typeSelect.on('change', function() {
         var type = $typeSelect.find('option:selected').text();

         if (type === 'Multiple Choice') {
            $questionTypeArea.html(questionTypeChange(type));
         } else if (!$('.question-type-area.coding').length) {
            $questionTypeArea.html(questionTypeChange(type));
            var editor = ace.edit('editor');

            editor.setTheme('ace/theme/monokai');
            editor.getSession().setMode('ace/mode/javascript');
         }
      });

      $questionType.append($typeSelect);
      $questionForm
          .append(questionName)
          .append($questionType)
          .append(questionStatement)
          .append($questionTypeArea)
          .append(createHints());

      return $questionForm;
   }

   function addQuestionButtonClick(pageId) {
      var $modal = $('.modal');

      $modal
          .data('p-id', pageId)
          .addClass('question')
          .find('.modal-header h1')
          .text('Add Question')
          .end()
          .find('.modal-footer .btn-success')
          .addClass('create-question')
          .removeClass('edit-question')
          .text('Create');

      var $modalBody = $modal.find('.modal-body');

      $modalBody
          .html(createQuestionForm());

      $modal
          .fadeIn(600);
      $('body').css('overflow', 'hidden');
      require('./modal-resize')();
   }

   function editQuestionButtonClick(pageId) { // Needs question id
      $('.modal')
          .data('p-id', pageId)
          .addClass('question')
          .find('.modal-footer .btn-success')
          .addClass('edit-question')
          .removeClass('create-question');
   }

   function setupModal() {
      $('#q-and-a-plugin').on('click', '.q-add>button', function() {
         addQuestionButtonClick($(this).closest('.questions').data('p-id'));
      });

      $('#q-and-a-plugin').on('click', '.q-edit>button', function() {
         editQuestionButtonClick($(this).closest('.questions').data('p-id'));
      });

      // $('#q-and-a-plugin').on('click', '.q-preview>button', function() {
      //     var row = $(this).closest('.questions');
      //     questionPreviewButtonClick(row.data('p-id'), row.data('p-title'));
      // });

      bindMultipleChoiceEvents();
      bindCodeAreaEvents();
   }

   setupModal();

   function validateMultipleChoice() {
      if (!$('.mc-text-option .form-control.wrong').length) {
         $('.mc-option-change').after('<span class="error-text">There must be at least one wrong answer!</span>');

         return false;
      } else if ($('.mc-text-option .form-control.wrong').length === $('.mc-text-option').length) {
         $('.mc-option-change').after('<span class="error-text">There must be at least one correct answer!</span>');

         return false;
      } else {
         // Loop through each of the fields, each
         return true;
      }
   }

   function validateCodeArea() {
      // Var $questionCode;
      var passed = true;

      // $questionCode = ace.edit('editor').getValue(); deal with later, length?

      $('.io').each(function() {
         if (!$(this).data('input') || !$(this).data('output')) {
            $(this).addClass('error');

            if (passed) {
               passed = false;
            }
         }
      });

      return passed;
   }

   function validateHints() {
      var passed = true;

      $('.hint').each(function() {
         if ($(this).data('hint-text')) {
            if ($(this).data('hint-text').length < 20) {
               $(this).addClass('error');

               if (passed) {
                  passed = false;
               }
            }
         } else {
            $(this).addClass('error');

            if (passed) {
               passed = false;
            }
         }
      });

      return passed;
   }

   function validateQuestionForm() {
      $('.modal *').removeClass('error');
      $('.modal .error-text').remove();

      var passed = true;

      var $questionName = $('#q-name-input');

      if ($questionName.val().length < 10) {
         $questionName.addClass('error');
         passed = false;
      }

      var $questionStatement = $('#q-statement-input');

      if ($questionStatement.val().length < 50) {
         $questionStatement.addClass('error');
         passed = false;
      }

      var $questionType = $('#q-type-select').find('option:selected').text();

      if ($questionType === 'Multiple Choice') {
         passed = validateMultipleChoice() ? passed : false;
      } else {
         passed = validateCodeArea() ? passed : false;
      }

      validateHints();
   }

   $('#q-and-a-plugin').on('click', ' .modal .create-question', function() {
      validateQuestionForm();
   });
});

},{"./modal-resize":3}],6:[function(require,module,exports){
$(function() {
   'use strict';

   $('#q-and-a-plugin').on('click', '.modal-close, .modal-overlay, .close-modal', function() {
      require('./modals/modal-close')();
   });

   $(window).on('resize', function() {
      if ($('.modal:visible').length) {
         require('./modals/modal-resize')();
      }
   });

   function createPageTable() {
      var $pageTable = $('<div class="qa-tbl"></div>');
      var tableHeader = '<div class="qa-tbl-row qa-tbl-hdr qa-stripe"><div class="qa-page-id qa-center"><span>Page ID</span></div>' +
          '<div class="qa-page-title"><span>Page Title</span></div><div class="qa-page-q-count qa-center"><span>Question Count</span>' +
          '</div><div class="qa-page-preview qa-center"><span>Preview</span></div></div>';

      $pageTable.append(tableHeader);

      for(var i = 0; i < pages.length; i++) {
         var page = pages[i];
         var $row = $('<div class="qa-tbl-row qa-stripe page" data-p-id="' + page[0] + '" data-p-title="' + page[1] + '"></div>');

         $row
             .append('<div class="qa-page-id qa-center"><span>' + page[0] + '</span></div>')
             .append('<div class="qa-page-title"><span>' + page[1] + '</span></div>')
             .append('<div class="qa-page-q-count qa-center"><span> 0 </span></div>')
             .append('<div class="qa-page-preview qa-center"><button type="button" class="btn btn-success page-preview">' +
                 '<span class="glyphicon glyphicon-eye-open"></span><a href="' + page[2] + '" target="_blank" rel="noopener">' +
                 '</a></button></div>');

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

},{"./modals/modal-close":2,"./modals/modal-resize":3}]},{},[1,2,3,4,5,6]);
