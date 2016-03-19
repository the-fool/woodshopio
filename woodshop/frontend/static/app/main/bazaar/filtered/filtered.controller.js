(function ()
{
  'use strict';

  angular
      .module('app.bazaar.filtered')
      .controller('BazaarFilteredController', BazaarFilteredController);

      /** @ngInject */
      function BazaarFilteredController(GemData, $scope, $timeout, $stateParams, msApi, CATEGORIES) {
        var initializing = true;

        var vm = this;
        vm.gems = GemData.results;
        vm.tabs = parseTabLabels();
        vm.activeTab = $stateParams.subCategory ? $stateParams.subCategory : $stateParams.category;

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
        console.log(vm.tabs);

        $scope.$watch('selectedIndex', function(current, old) {
          if (current !== undefined) {
            // on initial load, this code fires with undefined current arg
            if (initializing) {
              $timeout(function() { initializing = false; });
            } else {
              vm.activeTab = vm.tabs[current];
              $timeout(function() {
                msApi.request('gem-browse@get', {category : $stateParams.category, sub_category : vm.activeTab},
                    function(response)
                    {
                      vm.gems = response.results;
                    },
                    function (error)
                    {
                      console.log(error);
                    }
                );
              });
            }
          }
        });

      }

})();
