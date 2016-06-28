$(function() {

    "use strict";

    $('#q-and-a-plugin').on('click', '.q-embed>button', function () {
        var row = $(this).closest('.questions');
        questionEmbedButtonClick(row.data('p-id'), row.data('p-title'), row.prev().find('.qa-page-preview a').attr('href'));
    });

    function questionEmbedButtonClick(page_id, page_title, preview_link) {
        var modal = $('.modal');
        var data = {
            action: 'embed_question',
            page_id: page_id
        };

        $.ajax({
                type: "post",
                url: wp_ajax.ajax_url,
                data: data
            })
            .done(function (data) {
                console.log("success - get edit page");
            })
            .fail(function () {
                console.log("error - get edit page");
            })
            .always(function (data) {
                console.log('always - get edit page');
                modal
                    .data({
                        'p-id': page_id,
                        'p-title': page_title
                    })
                    .addClass('page embed')
                    .find('.modal-header>h1')
                        .text(page_title + ': <iframe src="http://www.example.com"></iframe>')
                    .end()
                    .find('.modal-body')
                        .html(data)
                    .end()
                    .find('.modal-footer .close-modal')
                        .after('<button class="btn btn-primary preview"><a href="' + preview_link + '" rel="noopener" target="_blank">Preview</a></button>')
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

    $('#q-and-a-plugin').on('click', '.modal .save', function () {
        savePage();
    });

    function savePage() {
        var modal = $('.modal');
        var page_id = modal.data('p-id');
        var page_title = modal.data('p-title');
        var page_content = modal.find('textarea.wp-editor-area').val();

        var data = {
            action: 'update_page',
            page_id: page_id,
            page_content: page_content
        };

        $.ajax({
                type: "post",
                dataType: "json",
                url: wp_ajax.ajax_url,
                data: data
            })
            .done(function (data) {
                console.log("success - update page");
            })
            .fail(function () {
                console.log("error - update page");
            })
            .always(function (data) {
                console.log('always - update page');
                var $message = $('<div class="modal-message-overlay"><div class="modal-message-content"><h2>The ' + page_title + ' page has been updated successfully!</h2></div></div>');

                modal.find('.modal-content').append($message);

                $message
                    .hide()
                    .fadeIn(600)
                    .delay(2200)
                    .fadeOut(800, function() {
                        $message.remove();
                    });
            });
    }
});
