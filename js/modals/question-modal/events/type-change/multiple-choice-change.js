
function createMultipleChoiceArea() {
   'use strict';

   var $questionTypeArea = $('.modal .js-question-type-area');

   $questionTypeArea.attr('class', 'js-question-type-area multiple-choice');

   var $optionControl = $('.qa-templates .js-modal-question-mc .js-mc-add-remove')
       .clone()
       .children();

   for(var i = 0; i < 4; i++) {
      $optionControl = $optionControl.add(require('../multiple-choice/create-option')(i));
   }

   $questionTypeArea.html($optionControl);
}

module.exports = createMultipleChoiceArea;
