function hintButtonClick($button) {
   'use strict';

   if (!$button.hasClass('js-active')) {
      var $activeButton = $('.modal .js-hint-active');
      var $hintsTextarea = $('.modal .js-hints-textarea');

      $activeButton
          .data('hint-text', $hintsTextarea.val())
          .removeClass('js-hint-active active')
          .find('span')
          .text($activeButton.data('hint'));

      $hintsTextarea
          .val($button.data('hint-text'))
          .attr('placeholder', 'Hint ' + $button.data('hint'));

      $button
          .addClass('js-hint-active active')
          .find('span')
          .text('Hint ' + $button.data('hint'));

      $hintsTextarea.focus();
   }
}

function saveHint(hintText) {
   'use strict';

   $('.hint.active').data('hint-text', hintText);
}

module.exports = {
   buttonClick: hintButtonClick,
   saveHint: saveHint
};