$(function() {
   'use strict';

   function questionEmbedButtonClick(pageId, pageTitle, previewLink) {
      var $modal = $('.modal');
      var data = {
         action: 'embedQuestion',
         pageId: pageId
      };

      $.ajax({
            type: 'post',
            url: wpAjax.ajaxUrl,
            data: data
         })
          .done(function(data) {
            console.log(data);
            console.log('success - get edit page');
         })
          .fail(function() {
            console.log('error - get edit page');
         })
          .always(function(data) {
            console.log('always - get edit page');
            $modal
                .data({
                  'p-id': pageId,
                  'p-title': pageTitle
               })
                .addClass('page embed')
                .find('.modal-header>h1')
                .text(pageTitle + ': <iframe src="http://www.example.com"></iframe>')
                .end()
                .find('.modal-body')
                .html(data)
                .end()
                .find('.modal-footer .close-modal')
                .after('<button class="btn btn-primary preview"><a href="' + previewLink + '" rel="noopener" ' +
                    'target="_blank">Preview</a></button>')
                .end()
                .find('.modal-footer .btn-success')
                .addClass('save')
                .text('Save')
                .end()
                .fadeIn(600);

            $('body').css('overflow', 'hidden');
            resizeModalBody();
         });
   }

   function savePage() {
      var $modal = $('.modal');
      var pageId = $modal.data('p-id');
      var pageTitle = $modal.data('p-title');
      var pageContent = $modal.find('textarea.wp-editor-area').val();

      var data = {
         action: 'updatePage',
         pageId: pageId,
         pageContent: pageContent
      };

      $.ajax({
            type: 'post',
            dataType: 'json',
            url: wpAjax.ajaxUrl,
            data: data
         })
          .done(function(data) {
            console.log('success - update page');
            console.log(data);
         })
          .fail(function() {
            console.log('error - update page');
         })
          .always(function(data) {
            console.log('always - update page');
            console.log(data);
            var $message = $('<div class="modal-message-overlay"><div class="modal-message-content">' +
                '<h2>The ' + pageTitle + ' page has been updated successfully!</h2></div></div>');

            $modal.find('.modal-content').append($message);

            $message
                .hide()
                .fadeIn(600)
                .delay(2200)
                .fadeOut(800, function() {
                  $message.remove();
               });
         });
   }

   $('#q-and-a-plugin').on('click', '.q-embed>button', function() {
      var row = $(this).closest('.questions');
      var previewLink = row.prev().find('.qa-page-preview a').attr('href');

      questionEmbedButtonClick(row.data('p-id'), row.data('p-title'), previewLink);
   });

   $('#q-and-a-plugin').on('click', '.modal .save', function() {
      savePage();
   });
});
