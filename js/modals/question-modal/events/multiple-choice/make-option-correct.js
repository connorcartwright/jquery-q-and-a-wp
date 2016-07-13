
function makeOptionCorrect(button) {
   'use strict';

   var input = button.closest('.input-group').find('input');

   if (input.hasClass('wrong')) {
      input.removeClass('wrong').addClass('correct');
      button.find('.btn').addClass('btn-success').removeClass('btn-default');
   } else {
      input.removeClass('correct').addClass('wrong');
      button.find('.btn').removeClass('btn-success').addClass('btn-default');
   }
}

module.exports = makeOptionCorrect;