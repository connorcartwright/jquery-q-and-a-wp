function getQuestionsForPage(pageID, callback) {
   'use strict';

   var data = {
      action: 'getQuestionsForPage',
      id: pageID,
      accessToken: accessToken
   };

   $.ajax({
      url: 'https://cryptic-sands-74858.herokuapp.com',
      method: 'POST',
      data: data,
      dataType: 'json',
      crossDomain: true
   })
       .done(function() {
         console.log('done/success');
      })
       .fail(function() {
         console.log('fail/error');
      })
       .always(function(data) {
         console.log('always');

         return callback(data.questions);
      });
}

function getQuestionCount(pageID, callback) {
   'use strict';

   var data = {
      action: 'getQuestionCount',
      id: pageID,
      accessToken: accessToken
   };

   $.ajax({
      url: 'https://cryptic-sands-74858.herokuapp.com',
      method: 'POST',
      data: data,
      dataType: 'json',
      crossDomain: true
   })
       .done(function() {
         console.log('done/success');
      })
       .fail(function() {
         console.log('fail/error');
      })
       .always(function(data) {
         console.log('get question count');
         console.log(data);
         console.log('get question count always');

         return callback(data.pageCount);
      });
}

function createPageRow(i) {
   'use strict';

   var $templates = $('.qa-templates');
   var page = pages[i];

   var $row = $templates.find('.js-page-row')
       .clone()
       .children();

   $row
       .data({
         'p-id': page[0],
         'p-title': page[1]
      })
       .find('.qa-page-id>span')
       .text(page[0])
       .end()
       .find('.qa-page-title>span')
       .text(page[1])
       .end()
       .find('.qa-page-preview>a')
       .attr('href', page[2])
       .end();

   getQuestionCount(page[0], function(data) {
      $row
          .find('.qa-page-q-count')
          .text(data);
   });

   return $row;
}

function createPageRows() {
   'use strict';

   var $rows = $('');

   for(var i = 0; i < pages.length; i++) {
      $rows = $rows.add(createPageRow(i));
   }

   return $rows;
}

module.exports = {
   createPageRows: createPageRows,
   getQuestions: getQuestionsForPage,
   getQuestionCount: getQuestionCount
};
