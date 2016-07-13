function removeMultipleChoiceOption() {
   'use strict';

   var $multipleChoiceOptions = $('.modal .js-mc-text-option');

   if ($multipleChoiceOptions.length > 2) {
      $multipleChoiceOptions.last().remove();
   }
}

module.exports = removeMultipleChoiceOption;
