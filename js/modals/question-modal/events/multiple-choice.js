// N used when in loop and the options haven't been inserted into the DOM yet
function createMultipleChoiceOption(n) {
   'use strict';

   var $templates = $('.qa-templates');
   var newOption = $('.modal .mc-text-option').length + 1;

   var input = '<input type="text" class="form-control wrong" placeholder="Option ' +
       (n ? newOption + n : newOption) + ' Text">';

   var $option = $templates.find('.js-modal-question-mc .js-mc-options')
       .clone()
       .children();

   $option.find('.js-option').prepend(input);

   return $option;
}

function addMultipleChoiceOption() {
   'use strict';

   var $options = $('.modal .js-mc-text-option');
   var optionsCount = $options.length;

   if (optionsCount < 8) {
      $('.js-mc-remove-option').removeClass('btn-disabled');
      $options.last().after(createMultipleChoiceOption());

      if (optionsCount === 7) {
         $('.js-mc-add-option').addClass('btn-disabled');
      }
   }
}

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

function removeMultipleChoiceOption() {
   'use strict';

   var $multipleChoiceOptions = $('.modal .js-mc-text-option');

   if ($multipleChoiceOptions.length > 2) {
      $('.js-mc-add-option').removeClass('btn-disabled');
      $multipleChoiceOptions.last().remove();

      if ($multipleChoiceOptions.length === 3) {
         $('.js-mc-remove-option').addClass('btn-disabled');
      }
   }
}

module.exports = {
   addOption: addMultipleChoiceOption,
   createOption: createMultipleChoiceOption,
   makeOptionCorrect: makeOptionCorrect,
   removeOption: removeMultipleChoiceOption
};
