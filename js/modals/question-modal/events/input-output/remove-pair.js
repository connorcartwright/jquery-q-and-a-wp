function removeInputOutputPair() {
   'use strict';

   var $inputOutputButtons = $('.modal .js-input-output-button');

   if ($inputOutputButtons.length > 3) {
      $inputOutputButtons.last().remove();
   }
}

module.exports = removeInputOutputPair;

