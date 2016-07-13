function addMultipleChoiceOption() {
   'use strict';

   var $options = $('.modal .js-mc-text-option');
   var optionsCount = $options.length;

   if (optionsCount < 8) {
      $options.last().after(require('./create-option')());
   }
}

module.exports = addMultipleChoiceOption;