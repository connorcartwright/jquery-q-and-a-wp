
function saveHint(hintText) {
   'use strict';

   $('.hint.active').data('hint-text', hintText);
}

module.exports = saveHint;
