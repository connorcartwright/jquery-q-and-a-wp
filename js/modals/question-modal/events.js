'use strict';

var $hintEvents = require('./events/hints');
var $typeChangeEvents = require('./events/type-change');
var $multipleChoiceEvents = require('./events/multiple-choice');
var $ioEvents = require('./events/input-output');
var validate = require('./validate');
var createQuestion = require('./events/create-question');

function bindHintEvents() {
   var $qaPlugin = $('.q-and-a-plugin');

   $qaPlugin
       .on('click', '.modal .js-hint', function() {
         $hintEvents.buttonClick($(this));
      })

       .on('keyup', '.modal .js-hints-textarea', function() {
         $hintEvents.saveHint($(this).val());
      });
}

function bindTypeChangeEvents() {
   var $qaPlugin = $('.q-and-a-plugin');

   $qaPlugin
       .on('change', '.modal .js-question-type-select', function() {
         $typeChangeEvents.questionTypeChange($(this).find('option:selected').text());
      });
}

function bindMultipleChoiceEvents() {
   var $qaPlugin = $('.q-and-a-plugin');

   $qaPlugin
       .on('click', '.modal .js-mc-add-option', function() {
         $multipleChoiceEvents.addOption();
      })

       .on('click', '.modal .js-mc-remove-option', function() {
         $multipleChoiceEvents.removeOption();
      })

       .on('click', '.correct-answer', function() {
         $multipleChoiceEvents.makeOptionCorrect($(this));
      });
}

function bindCodeAreaEvents() {
   var $qaPlugin = $('.q-and-a-plugin');

   $qaPlugin
       .on('click', '.modal .js-add-input-output', function() {
         $ioEvents.addInputOutputPair();
      })

       .on('click', '.modal .js-remove-input-output', function() {
         $ioEvents.removeInputOutputPair();
      })

       .on('click', '.modal .js-input-output-button', function() {
         $ioEvents.buttonClick($(this));
      })

       .on('keyup', '.modal .js-io-input', function() {
         $ioEvents.saveInput($(this).val());
      })

       .on('keyup', '.modal .js-io-output', function() {
         $ioEvents.saveOutput($(this).val());
      });
}

function manageData(data) {
   console.log(data);

   // Function to update dom based on the result
}

function bindCreateQuestion() {
   $('.q-and-a-plugin').on('click', ' .modal .js-create-question', function() {
      if (validate()) {
         createQuestion(manageData);
      }
   });
}

function bindEvents() {
   bindMultipleChoiceEvents();
   bindCodeAreaEvents();
   bindHintEvents();
   bindTypeChangeEvents();
   bindCreateQuestion();
}

module.exports = bindEvents;
