(function ()
{
  'use strict';

  angular
      .module('app.bazaar.filtered')
      .controller('BazaarFilteredController', BazaarFilteredController);


      function BazaarFilteredController(GemData) {
        console.log('data', GemData);
        var vm = this;
        
      }

})();
