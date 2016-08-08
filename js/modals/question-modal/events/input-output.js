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

function inputOutputButtonClick($button) {
   'use strict';

   if (!$button.hasClass('active')) {
      var $activeButton = $('.modal .js-input-output-active');
      var $inputOutputTextarea = $('.modal .js-io-input');
      var $output = $('.modal .js-io-output');

      $activeButton
          .data('input', $inputOutputTextarea.val())
          .data('output', $output.val())
          .removeClass('js-input-output-active active')
          .find('span')
          .text($activeButton.data('io'));

      $inputOutputTextarea
          .val($button.data('input'))
          .attr('placeholder', 'Question Input ' + $button.data('io'));
      $output
          .val($button.data('output'))
          .attr('placeholder', 'Expected Output ' + $button.data('io'));

      $button
          .addClass('js-input-output-active active')
          .find('span')
          .text('IO ' + $button.data('io'));

      $inputOutputTextarea.focus();
   }
}

function removeInputOutputPair() {
   'use strict';

   var $inputOutputButtons = $('.modal .js-input-output-button');

   if ($inputOutputButtons.length > 3) {
      $inputOutputButtons.last().remove();
   }
}

function saveInput(inputText) {
   'use strict';

   $('.js-input-output-active').data('input', inputText);
}

function saveOutput(outputText) {
   'use strict';

   $('.js-input-output-active').data('output', outputText);
}

module.exports = {
   addInputOutputPair: addInputOutputPair,
   buttonClick: inputOutputButtonClick,
   removeInputOutputPair: removeInputOutputPair,
   saveInput: saveInput,
   saveOutput: saveOutput
};
