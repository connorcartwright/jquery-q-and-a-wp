var events = require('./events.js');

events();

function openDeleteModal(questionID) {
   'use strict';

   var $modal = $('.modal');

   $modal
       .data({
         'q-id': questionID
      })
       .addClass('delete')
       .find('.modal-header h1')
       .text('Delete Question')
       .end()
       .find('.modal-footer .btn-success')
       .attr('class', 'btn btn-danger js-delete-question')
       .text('Delete');

   var $modalBody = $modal.find('.modal-body');

   $modalBody
       .empty()
       .html('Are you sure you want to delete this question?');

   $modal.fadeIn(600);
}

module.exports = openDeleteModal;
