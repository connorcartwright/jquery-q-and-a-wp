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
      var $templates = $('.qa-templates');
      var hints = $templates.find('.js-modal-question .js-hints')
          .clone()
          .children();

      $('.modal').on('keyup', '.hints-textarea', function() {
         $('.hint.active').data('hint-text', $(this).val());
      });

      $('.modal').on('click', '.hint', function() {
         hintButtonClick($(this));
      });

      return hints;
   }

   function createMultipleChoiceOptions(n) {
      var $r = $('');
      var $templates = $('.qa-templates');

      for(var i = 0; i < n; i++) {
         var input = '<input type="text" class="form-control wrong" id="q-mc-option-' + i + '" placeholder="Option ' +
             (i + 1 + $('.multiple-choice>.mc-text-option').length) + ' Text">';

         console.log('i: ' + i);
         console.log('length: ' + $('.multiple-choice>.mc-text-option').length);

         var $option = $templates.find('.js-modal-question-mc .js-mc-option')
             .clone()
             .children();

         $option.find('.input-group.input').prepend(input);

         $r = $r.add($option);
      }

      return $r;
   }

   function createMultipleChoiceArea() {
      $('.question-type-area').attr('class', 'question-type-area multiple-choice');

      var $optionControl = $('.qa-templates .js-modal-question-mc .js-mc-add-remove')
          .clone()
          .children();

      return $optionControl.add(createMultipleChoiceOptions(4));
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
      resizeModalBody();
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
