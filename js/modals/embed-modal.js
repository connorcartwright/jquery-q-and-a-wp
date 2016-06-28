$(function() {

    "use strict";

    $('#q-and-a-plugin').on('click', 'div.q-embed>button', function () {
        var row = $(this).closest('div.questions');
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
                modal.addClass('page embed');
                modal.data('p-id', page_id);
                modal.data('p-title', page_title);
                modal.find('.modal-footer button.close-modal').after('<button class="btn btn-primary preview"><a href="' + preview_link + '" rel="noopener" target="_blank">Preview</a></button>');
                modal.find('.modal-footer button.btn-success').addClass('save');
                modal.fadeIn(600);
                $('body').css('overflow', 'hidden');
                modal.find('.modal-header>h1').text(page_title + ': <iframe src="http://www.example.com"></iframe>');
                modal.find('.modal-body').empty().append(data);
                resizeModalBody();
            });
    }

    $('.modal').on('click', 'button.save', function () {
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

                $message.hide().fadeIn(600, function () {
                    setTimeout(function () {
                        $message.fadeOut(800, function () {
                            $message.remove();
                        });
                    }, 2200);
                });
            });
    }
});
