function closeModal() {
   'use strict';

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

module.exports = closeModal;
