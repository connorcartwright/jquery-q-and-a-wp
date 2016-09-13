function checkAuth(accessToken, callback) {
   'use strict';

   var data = {
      action: 'checkAuth',
      accessToken: accessToken
   };

   $.ajax({
      url: 'http://SERVER_IP:PORT',
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
         return callback(data.response);
      });
}

module.exports = checkAuth;
