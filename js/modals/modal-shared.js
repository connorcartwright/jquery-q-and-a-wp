
function resizeModalBody() {
    "use strict";
    var modal_height = $('div.modal div.modal-content').height();
    var modal_header_height = $('div.modal div.modal-header').outerHeight(true);
    var modal_footer_height = $('div.modal div.modal-footer').outerHeight(true);
    $('div.modal div.modal-body').height(modal_height - (modal_header_height + modal_footer_height));
}

function closeModal() {
    "use strict";
    if(!getSelection().toString()) {
        var modal = $('div.modal');
        modal.fadeOut(600, function() {
            if (modal.hasClass('page')) {
                modal.find('.preview').remove();
            }

            modal.find('.modal-footer button.btn-success').attr('class', 'btn btn-success');
            modal.attr('class', 'modal');
        });
        $('body').css('overflow','auto');
    }
}

$(window).on('resize', function() {
    if ($('.modal:visible').length) {
        resizeModalBody($('.modal:visible').attr('id'));
    }
});
                                                                                                                                                                                                                                                                                                                                            //
$('.modal-close, .modal-overlay, .close-modal').on('click', function() {
    closeModal();
});


