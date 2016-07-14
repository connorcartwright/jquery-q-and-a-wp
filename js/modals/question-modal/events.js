
function bindHintEvents() {
   'use strict';

   var $qaPlugin = $('.q-and-a-plugin');
   var $hintEvents = require('./events/hints');

   $qaPlugin
       .on('click', '.modal .js-hint', function() {
         $hintEvents.buttonClick($(this));
      })

       .on('keyup', '.modal .js-hints-textarea', function() {
         $hintEvents.saveHint($(this).val());
      });
}

function bindTypeChangeEvents() {
   'use strict';

   var $qaPlugin = $('.q-and-a-plugin');
   var $typeChangeEvents = require('./events/type-change');

   $qaPlugin
       .on('change', '.modal .js-question-type-select', function() {
         $typeChangeEvents.questionTypeChange($(this).find('option:selected').text());
      });
}

function bindMultipleChoiceEvents() {
   'use strict';

   var $qaPlugin = $('.q-and-a-plugin');
   var $multipleChoiceEvents = require('./events/multiple-choice');

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
   'use strict';

   var $qaPlugin = $('.q-and-a-plugin');
   var $ioEvents = require('./events/input-output');

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

function bindEvents() {
   'use strict';

   bindMultipleChoiceEvents();
   bindCodeAreaEvents();
   bindHintEvents();
   bindTypeChangeEvents();
}

module.exports = bindEvents;
