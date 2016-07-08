function resizeModalBody() {
   'use strict';

   var modalHeight = $('.modal .modal-content').height();
   var modalHeaderHeight = $('.modal .modal-header').outerHeight(true);
   var modalFooterHeight = $('.modal .modal-footer').outerHeight(true);

   $('.modal .modal-body').height(modalHeight - (modalHeaderHeight + modalFooterHeight));
}

module.exports = resizeModalBody;
