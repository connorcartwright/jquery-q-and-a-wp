
function fillMultipleChoiceOptions(options, $questionForm) {
   'use strict';

   var numAnswers = options.length;
   var $multipleChoiceEvents = require('./events/multiple-choice');
   var $createOption = $multipleChoiceEvents.createOption;
   var $makeCorrect = $multipleChoiceEvents.makeOptionCorrect;

   if (numAnswers < 4) {
      for(var i = 4; i > numAnswers; i--) {
         $questionForm.find('.js-mc-text-option').last().remove();
      }
   }

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
      }
   }
}

function fillCodingOptions(options, $questionForm) {
   'use strict';

   var $inputOutputEvents = require('./events/input-output');
   var $addInputOutput = $inputOutputEvents.addInputOutputPair;

   var numAnswers = options.length;

   if (numAnswers > 3) {
      for(var i = 3; i < numAnswers; i++) {
         $addInputOutput();
      }
   }

   for(var j = 0; j < numAnswers; j++) {
      var input = options[j].Input;
      var output = options[j].Output;

      // $("ul[data-slide='" + current +"']");

      var inputOutputButton = $questionForm.find('.js-input-output-button[data-io="' + (j + 1) + '"]');

      inputOutputButton.data('input', input);
      inputOutputButton.data('output', output);
   }

   var inputTextarea = $questionForm.find('.js-io-input');
   var outputInput = $questionForm.find('.js-io-output');

   inputTextarea.val(options[0].Input);
   outputInput.val(options[0].Output);
}

function typeChange(questionType, questionAnswers) {
   'use strict';

   var $questionForm = $('.modal .js-question.form');

   if (questionType === 'Multiple Choice') {
      fillMultipleChoiceOptions(questionAnswers, $questionForm);
   } else {
      $('.modal .js-question-type-select').val(questionType).attr('selected', true);
      var $typeChangeEvents = require('./events/type-change');

      $typeChangeEvents.questionTypeChange(questionType);

      // $('.modal .js-question-type-select').val(questionData.questionType).attr('selected', true);

      fillCodingOptions(questionAnswers, $questionForm);
   }
}

module.exports = typeChange;

