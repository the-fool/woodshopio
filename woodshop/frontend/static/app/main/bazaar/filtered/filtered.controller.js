(function ()
{
  'use strict';

  angular
      .module('app.bazaar.filtered')
      .controller('BazaarFilteredController', BazaarFilteredController);

      function BazaarFilteredController(GemData) {

        var vm = this;
        vm.gems = GemData.results;

      }

})();
