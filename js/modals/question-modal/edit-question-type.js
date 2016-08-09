'use strict';

var $multipleChoiceEvents = require('./events/multiple-choice');
var $typeChangeEvents = require('./events/type-change');
var $inputOutputEvents = require('./events/input-output');

function checkMultipleChoiceButtons(numAnswers) {
   if (numAnswers === 2) {
      $('.js-mc-remove-option').addClass('btn-disabled');
   } else if (numAnswers === 8) {
      $('.js-mc-add-option').addClass('btn-disabled');
   }
}

function fillMultipleChoiceOptions(options, $questionForm) {
   var numAnswers = options.length;
   var $createOption = $multipleChoiceEvents.createOption;
   var $makeCorrect = $multipleChoiceEvents.makeOptionCorrect;

   if (numAnswers < 4) {
      for(var i = 4; i > numAnswers; i--) {
         $questionForm.find('.js-mc-text-option').last().remove();
      }
   }

   checkMultipleChoiceButtons(numAnswers);

   for(var j = 0; j < numAnswers; j++) {
      var $option;

      if (j > 3) {
         $option = $createOption();
         $questionForm.find('.js-mc-text-option').last().after($option);
      } else {
         $option = $questionForm.find('.js-mc-text-option-' + (j + 1));
      }

      $option.find('input').val(options[j].OptionText);

      if (options[j].Correct) {
         $makeCorrect($option.find('button'));
         $option
             .find('.mc-correct-answer')
             .addClass('btn-success')
             .removeClass('btn-default');
      }
   }
}

function checkInputOutputButtons(numPairs) {
   console.log('numpairs: ' + numPairs);

   if (numPairs === 3) {
      $('.js-remove-input-output').addClass('btn-disabled');
   } else if (numPairs === 8) {
      $('.js-add-input-output').addClass('btn-disabled');
   }
}

function fillCodingOptions(options, $questionForm) {
   var $addInputOutput = $inputOutputEvents.addInputOutputPair;

   var numPairs = options.length;

   if (numPairs > 3) {
      for(var i = 3; i < numPairs; i++) {
         $addInputOutput();
      }
   }

   checkInputOutputButtons(numPairs);

   for(var j = 0; j < numPairs; j++) {
      var input = options[j].Input;
      var output = options[j].Output;

      var inputOutputButton = $questionForm.find('.js-input-output-button[data-io="' + (j + 1) + '"]');

      inputOutputButton.data('input', input);
      inputOutputButton.data('output', output);
   }

   var inputTextarea = $questionForm.find('.js-io-input');
   var outputInput = $questionForm.find('.js-io-output');

   inputTextarea.val(options[0].Input);
   outputInput.val(options[0].Output);
}

function fillCodingArea(questionCode) {
   var editor = ace.edit('qa-code-editor');

   editor.setValue(questionCode, 1);
}

function typeChange(questionType, questionAnswers, questionCode) {
   var $questionForm = $('.modal .js-question.form');

   if (questionType === 'Multiple Choice') {
      fillMultipleChoiceOptions(questionAnswers, $questionForm);
   } else {
      $('.modal .js-question-type-select').val(questionType).attr('selected', true);

      $typeChangeEvents.questionTypeChange(questionType);

      // $('.modal .js-question-type-select').val(questionData.questionType).attr('selected', true);
      fillCodingOptions(questionAnswers, $questionForm);
      fillCodingArea(questionCode);
   }
}

module.exports = typeChange;
