
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

module.exports = createCodeArea;