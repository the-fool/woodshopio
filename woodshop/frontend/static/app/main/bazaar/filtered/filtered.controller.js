(function ()
{
  'use strict';

  angular
      .module('app.bazaar.filtered')
      .controller('BazaarFilteredController', BazaarFilteredController);

      /** @ngInject */
      function BazaarFilteredController(GemData, $stateParams, CATEGORIES) {

        var vm = this;
        vm.gems = GemData.results;
        vm.tabs = [$stateParams.category];
        for (var i in CATEGORIES) {
          if (CATEGORIES[i][0] === $stateParams.category) {
            CATEGORIES[i][1].forEach(function(element) {
              vm.tabs.push(element);
            });
            break;
          }
        };
        console.log(vm.tabs);

      }

})();
