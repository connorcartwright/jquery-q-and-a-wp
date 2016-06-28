
function resizeModalBody() {
    "use strict";
    var modal_height = $('.modal .modal-content').height();
    var modal_header_height = $('.modal .modal-header').outerHeight(true);
    var modal_footer_height = $('.modal .modal-footer').outerHeight(true);
    $('.modal .modal-body').height(modal_height - (modal_header_height + modal_footer_height));
}

function closeModal() {
    "use strict";
    if(!getSelection().toString()) {
        var modal = $('.modal');
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
$('#q-and-a-plugin').on('click', '.modal-close, .modal-overlay, .close-modal', function() {
    closeModal();
});


