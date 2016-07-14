$(function() {
   'use strict';

   function createHints() {
      var $templates = $('.qa-templates');
      var hints = $templates.find('.js-modal-question .js-hints')
          .clone()
          .children();

      return hints;
   }

   function createMultipleChoiceArea() {
      $('.modal .js-question-type-area').attr('class', 'js-question-type-area multiple-choice');

      var $optionControl = $('.qa-templates .js-modal-question-mc .js-mc-add-remove')
          .clone()
          .children();

      for(var i = 0; i < 4; i++) {
         $optionControl = $optionControl.add(require('./events/multiple-choice/create-option')());
      }

      console.log('____ OPTION CONTROL ____');

      console.log($optionControl);

      return $optionControl;
   }

   function createCodeArea() {
      var $templates = $('.qa-templates');
      var $editor = $('<div id="qa-code-editor" class="code-editor mc-code">// Enter your code here</div>');

      $('.modal .js-question-type-area').attr('class', 'js-question-type-area coding');

      var $io = $templates.find('.js-modal-question-code .js-io')
          .clone()
          .children();

      return $editor.add($io);
   }

   function questionTypeChange(type) {
      $('.modal *').removeClass('error');

      switch(type) {
      case 'Multiple Choice':
         return createMultipleChoiceArea();
      default:
         return createCodeArea();
   }
   }

   function createQuestionForm() {
      var $templates = $('.qa-templates');

      var $questionForm = $templates
          .find('.js-modal-question .js-form')
          .clone()
          .children();

      var $typeSelect = $questionForm.find('#q-type-select');
      var $questionTypeArea = $questionForm.find('.js-question-type-area');

      $questionTypeArea.html(questionTypeChange($typeSelect.find('option:selected').text()));

      $typeSelect.on('change', function() {
         var type = $typeSelect.find('option:selected').text();

         if (type === 'Multiple Choice') {
            $questionTypeArea.html(questionTypeChange(type));
         } else if (!$('.modal .js-question-type-area.coding').length) {
            $questionTypeArea.html(questionTypeChange(type));
            var editor = ace.edit('qa-code-editor');

            editor.setTheme('ace/theme/monokai');
            editor.getSession().setMode('ace/mode/javascript');
         }
      });

      $questionForm.append(createHints());

      return $questionForm;
   }

   require('./events.js')();

   function openAddQuestionModal(pageID) {
      console.log('in add questions modal');
      console.log('in add questions modal1');
      console.log('in add questions modal2');
      var $modal = $('.modal');

      $modal
          .data('p-id', pageID)
          .addClass('question')
          .find('.modal-header h1')
          .text('Add Question')
          .end()
          .find('.modal-footer .btn-success')
          .attr('class', 'btn btn-success js-create-question')
          .text('Create');

      var $modalBody = $modal.find('.modal-body');

      $modalBody
          .empty()
          .html(createQuestionForm());

      $modal
          .fadeIn(600);
      $('body').css('overflow', 'hidden');
      require('../modal-resize')();
   }

   module.exports = openAddQuestionModal;
});
