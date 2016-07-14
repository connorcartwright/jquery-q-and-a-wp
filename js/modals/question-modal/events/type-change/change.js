function questionTypeChange(type) {
   'use strict';

   $('.modal .js-question-type-area *').removeClass('error');

   if (type === 'Multiple Choice') {
      require('./multiple-choice-change')();
   } else if (!$('.modal .js-question-type-area.coding').length) {
      require('./code-change')();
   }
}

module.exports = questionTypeChange;