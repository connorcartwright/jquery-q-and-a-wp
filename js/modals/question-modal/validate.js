'use strict';

function validateMultipleChoice() {
   if (!$('.modal .mc-text-option .form-control.wrong').length) {
      $('.modal .mc-option-change').after('<span class="error-text">There must be at least one <em>wrong</em> answer!</span>');

      return false;
   } else if ($('.modal .mc-text-option .form-control.wrong').length === $('.modal .mc-text-option').length) {
      $('.modal .mc-option-change').after('<span class="error-text">There must be at least one <em>correct</em> answer!</span>');

      return false;
   } else {
      var passed = true;

      $('.modal .js-option').each(function() {
         if ($(this).find('input').val().length < 1) {
            $(this).addClass('error');

            if (passed) {
               passed = false;
            }
         }
      });

      return passed;
   }
}

function validateCodeArea() {
   var passed = true;

   $('.modal .js-input-output-button').each(function() {
      if (!$(this).data('input') || !$(this).data('output')) {
         $(this).addClass('error');

         if (passed) {
            passed = false;
         }
      }
   });

   // Var questionCode = ace.edit('qa-code-editor').getValue();
   // no validation on question code due to possibility of short questions
   // and complete code will have no length limitation

   // validate input output

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

function validateQuestionName() {
   var $questionName = $('.modal #q-name-input');

   if ($questionName.val().length < 10) {
      $questionName.addClass('error');

      return false;
   } else {
      return true;
   }
}

function validateQuestionStatement() {
   var $questionStatement = $('.modal #q-statement-input');

   if ($questionStatement.val().length < 50) {
      $questionStatement.addClass('error');

      return false;
   } else {
      return true;
   }
}

function validateSharedFields() {
   var passed = true;

   passed = validateQuestionName() ? passed : false;
   passed = validateQuestionStatement() ? passed : false;
   passed = validateHints() ? passed : false;

   return passed;
}

function validateQuestionTypeArea() {
   var passed = true;
   var $questionType = $('.modal #q-type-select').find('option:selected').text();

   if ($questionType === 'Multiple Choice') {
      passed = validateMultipleChoice() ? passed : false;
   } else {
      passed = validateCodeArea() ? passed : false;
   }

   return passed;
}

function validateQuestionForm() {
   $('.modal *').removeClass('error');
   $('.modal .error-text').remove();

   var passed = true;

   passed = validateSharedFields() ? passed : false;
   passed = validateQuestionTypeArea() ? passed : false;

   return passed;
}

module.exports = validateQuestionForm;
