'use strict';

function closeModal() {
   if (!getSelection().toString()) {
      var $modal = $('.modal');

      $modal.fadeOut(600, function() {
         if ($modal.hasClass('page')) {
            $modal
                .find('.preview')
                .remove();
         }

         $modal
             .attr('class', 'modal')
             .find('.modal-footer .btn-success')
             .attr('class', 'btn btn-success');
      });
      $('body').css('overflow', 'auto');
   }
}

function resizeModalBody() {
   var modalHeight = $('.modal .modal-content').height();
   var modalHeaderHeight = $('.modal .modal-header').outerHeight(true);
   var modalFooterHeight = $('.modal .modal-footer').outerHeight(true);

   $('.modal .modal-body').height(modalHeight - (modalHeaderHeight + modalFooterHeight));
}

module.exports = {
   closeModal: closeModal,
   resizeModalBody: resizeModalBody
};