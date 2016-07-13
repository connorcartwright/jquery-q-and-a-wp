'use strict';

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

   // $questionCode = ace.edit('qa-code-editor').getValue(); deal with later, length?

   $('.modal .input-output-button').each(function() {
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

$('.q-and-a-plugin').on('click', ' .modal .js-create-question', function() {
   validateQuestionForm();
});

