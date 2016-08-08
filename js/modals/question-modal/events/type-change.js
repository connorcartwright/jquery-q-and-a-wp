function createCodeArea() {
   'use strict';

   var $questionTypeArea = $('.modal .js-question-type-area');

   $questionTypeArea.attr('class', 'js-question-type-area coding');

   var $templates = $('.qa-templates');
   var $editor = $('<div id="qa-code-editor" class="code-editor mc-code">// Enter your code here</div>');

   var $io = $templates.find('.js-modal-question-code .js-io')
       .clone()
       .children();

   $questionTypeArea.html($editor.add($io));

   var editor = ace.edit('qa-code-editor');

   editor.setTheme('ace/theme/monokai');
   editor.getSession().setMode('ace/mode/javascript');
}

function createMultipleChoiceArea() {
   'use strict';

   var $questionTypeArea = $('.modal .js-question-type-area');

   $questionTypeArea.attr('class', 'js-question-type-area multiple-choice');

   var $optionControl = $('.qa-templates .js-modal-question-mc .js-mc-add-remove')
       .clone()
       .children();

   for(var i = 0; i < 4; i++) {
      $optionControl = $optionControl.add(require('./multiple-choice').createOption(i));
   }

   $questionTypeArea.html($optionControl);
}

function questionTypeChange(type) {
   'use strict';

   $('.modal .js-question-type-area *').removeClass('error');

   if (type === 'Multiple Choice') {
      createMultipleChoiceArea();
   } else if (!$('.modal .js-question-type-area.coding').length) {
      createCodeArea();
   }
}

module.exports = {
   questionTypeChange: questionTypeChange,
   createCodeArea: createCodeArea,
   createMultipleChoiceArea: createMultipleChoiceArea
};

