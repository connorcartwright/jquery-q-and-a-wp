'use strict';

var $hintEvents = require('./events/hints');
var $typeChangeEvents = require('./events/type-change');
var $multipleChoiceEvents = require('./events/multiple-choice');
var $ioEvents = require('./events/input-output');
var validate = require('./validate');
var createQuestion = require('./events/create-question');
var createQuestionRow = require('../../tables/question-table').createRow;
var setRowData = require('../../tables/question-table').setRowData;
var closeModal = require('../modal.js').closeModal;

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
   data.answers = JSON.parse(data.answers);
   data.hint1 = data.questionHints[0];
   data.hint2 = data.questionHints[1];
   data.hint3 = data.questionHints[2];

   if ($('.modal').hasClass('add')) {
      var newRow = createQuestionRow(data);
      var rowHeight = 32;

      $('.qa-tbl-row.question').last().before(newRow);
      $('.qa-tbl-row.blank-row').height($('.qa-tbl-row.blank-row').height() + rowHeight);
   } else {
      var $row = $('.qa-tbl-row.question.active');

      $row.removeClass('active');

      setRowData($row, data);
   }

   closeModal();
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
