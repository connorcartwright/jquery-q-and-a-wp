function addInputOutputPair() {
   'use strict';

   var $inputOutputButtons = $('.modal .js-input-output-button');
   var inputOutputButtonCount = $inputOutputButtons.length;

   if (inputOutputButtonCount < 8) {
      var newInputOutputNum = inputOutputButtonCount + 1;
      var newInputOutput = '<button type="button" class="btn btn-default input-output-button  js-input-output-button" ' +
          'data-io="' + newInputOutputNum + '"><span>' + newInputOutputNum + '</span></button>';

      $inputOutputButtons
          .last()
          .after(newInputOutput);
   }
}

module.exports = addInputOutputPair;
