
function editQuestion(pageID, questionID) { // Needs question id
   'use strict';

   $('.modal')
       .data('p-id', pageID)
       .data('q-id', questionID)
       .addClass('question')
       .find('.modal-footer .btn-success')
       .attr('class', 'btn btn-success js-edit-question')
       .text('Update');
}

module.exports = editQuestion;