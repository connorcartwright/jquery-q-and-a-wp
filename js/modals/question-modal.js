$(function() {
   'use strict';

   function hintButtonClick($button) {
      if (!$button.hasClass('active')) {
         var $activeButton = $('.modal .hint.active');
         var $hintsTextarea = $('.modal .hints textarea');

         $activeButton
             .data('hint-text', $('.modal fieldset.hints textarea').val())
             .removeClass('active')
             .find('span')
             .text($activeButton.data('hint'));

         $hintsTextarea
            .val($button.data('hint-text'))
            .attr('placeholder', 'Hint ' + $button.data('hint'));

         $button
             .addClass('active')
             .find('span')
             .text('Hint ' + $button.data('hint'));

         $hintsTextarea.focus();
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
      var $options = $('');
      var $templates = $('.qa-templates');

      for(var i = 0; i < n; i++) {
         var input = '<input type="text" class="form-control wrong" id="q-mc-option-' + i + '" placeholder="Option ' +
             (i + 1 + $('.multiple-choice>.mc-text-option').length) + ' Text">';

         var $option = $templates.find('.js-modal-question-mc .js-mc-option')
             .clone()
             .children();

         $option.find('.input-group.input').prepend(input);

         $options = $options.add($option);
      }

      return $options;
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
      var $qa = $('#q-and-a-plugin');

      $qa
         .on('click', '.modal .mc-add-option', function() {
            $('.modal fieldset.mc-text-option').last().after(createMultipleChoiceOptions(1));
         })

         .on('click', '.modal .mc-remove-option', function() {
            if ($('.modal .mc-text-option').length > 2) {
               $('.modal .mc-text-option').last().remove();
            }
         })

         .on('click', '.correct-answer', function() {
            correctButtonClick($(this));
         });
   }

   function createCodeArea() {
      var $templates = $('.qa-templates');
      var $editor = $('<div id="editor" class="code-editor mc-code">// Enter your code here</div>');

      $('.question-type-area').attr('class', 'question-type-area coding');

      var $io = $templates.find('.js-modal-question-code .js-io')
          .clone()
          .children();

      return $editor.add($io);
   }

   function ioButtonClick($button) {
      if (!$button.hasClass('active')) {
         var $activeButton = $('.modal .io.active');
         var $ioTextarea = $('.modal .input-output textarea');
         var $ioOutput = $('.modal .input-output input');

         $activeButton
             .data('input', $ioTextarea.val())
             .data('output', $ioOutput.val())
             .removeClass('active')
             .find('span')
             .text($('.modal .io.active').data('io'));

         $ioTextarea
             .val($button.data('input'))
             .attr('placeholder', 'Question Input ' + $button.data('io'));
         $ioOutput
             .val($button.data('output'))
             .attr('placeholder', 'Expected Output ' + $button.data('io'));

         $button
             .addClass('active')
             .find('span')
             .text('IO ' + $button.data('io'));

         $ioTextarea.focus();
      }
   }

   function bindCodeAreaEvents() {
      var $qa = $('#q-and-a-plugin');

      $qa
         .on('click', '.modal .remove-io', function() {
            var $io = $('.modal .io');

            if ($io.length > 3) {
               $io.last().remove();
            }
         })

         .on('click', '.modal .add-io', function() {
            var $io = $('.modal .io');
            var ioLength = $io.length;

            if (ioLength < 8) {
               var count = ioLength + 1;
               var newIo = '<button type="button" class="btn btn-default io" data-io="' + count + '"><span>' + count + '</span></button>';

               $io
                  .last()
                  .after(newIo);
            }
         })

         .on('click', '.modal .io', function() {
            ioButtonClick($(this));
         })

         .on('keyup', '.modal #input-textarea', function() {
            $('.io.active').data('input', $(this).val());
         })

         .on('keyup', '.modal #output-input', function() {
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
      var $templates = $('.qa-templates');

      var $questionForm = $templates
          .find('.js-modal-question .js-form')
           .clone()
           .children();

      var $typeSelect = $questionForm.find('#q-type-select');
      var $questionTypeArea = $questionForm.find('.question-type-area');

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

      $questionForm.append(createHints());

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
      var $qa = $('#q-and-a-plugin');

      $qa
         .on('click', '.q-add>button', function() {
            addQuestionButtonClick($(this).closest('.questions').data('p-id'));
         })

         .on('click', '.q-edit>button', function() {
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
      if (!$('.modal .mc-text-option .form-control.wrong').length) {
         $('.modal .mc-option-change').after('<span class="error-text">There must be at least one <em>wrong</em> answer!</span>');

         return false;
      } else if ($('.modal .mc-text-option .form-control.wrong').length === $('.modal .mc-text-option').length) {
         $('.modal .mc-option-change').after('<span class="error-text">There must be at least one <em>correct</em> answer!</span>');

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

      $('.modal .hint').each(function() {
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

      var $questionName = $('.modal #q-name-input');

      if ($questionName.val().length < 10) {
         $questionName.addClass('error');
         passed = false;
      }

      var $questionStatement = $('.modal #q-statement-input');

      if ($questionStatement.val().length < 50) {
         $questionStatement.addClass('error');
         passed = false;
      }

      var $questionType = $('.modal #q-type-select').find('option:selected').text();

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
