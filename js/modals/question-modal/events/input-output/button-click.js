
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

module.exports = inputOutputButtonClick;
