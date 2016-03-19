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
        vm.tabs = parseTabLabels();
        vm.activeTab = $stateParams.subCategory ? $stateParams.subCategory : $stateParams.category;
        console.log(vm.activeTab); 
        function parseTabLabels() {
          var tabs = [$stateParams.category];
          for (var i in CATEGORIES) {
            if (CATEGORIES[i][0] === $stateParams.category) {
              CATEGORIES[i][1].forEach(function(element) {
                tabs.push(element);
              });
              break;
            }
          };
          return tabs;
        }

        console.log($stateParams);

      }

})();
