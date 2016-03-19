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

        // Set up tab nav
        vm.tabs = parseTabLabels();

        // Set current active tab
        vm.activeTab = $stateParams.subCategory ? $stateParams.subCategory : $stateParams.category;

        // Create map by category filters of gem data
        vm.gemMap = parseGemCategories();

        // Populate specific filter with data on initialization
        vm.gemMap[vm.activeTab].gems = GemData.results;
        vm.gemMap[vm.activeTab].initial = false;

        // Place filler data in all others (in order to structure the pages)
        // Without pre-existing filler data, the UI is wonky
        $timeout(function() {
          vm.tabs.forEach(function(category) {
            if (category !== vm.activeTab) {
              vm.gemMap[category].gems = GemData.results;
            }
          });
        }, 250);

        /******************************************************* /
        / Responds to clicks on category links on the gem cards  /
        /********************************************************/
        vm.selectTab = function(tab) {
          vm.activeTab = tab;
        };

        // on selection of tab, populate the tabbed content with fresh data
        $scope.$watch('selectedIndex', function(current, old) {
          if (current !== undefined) {
            // on initial load, this code fires with undefined current arg
            // so, pass on first initialization run
            if (initializing) {
              $timeout(function() { initializing = false; });
            } else {
              vm.activeTab = vm.tabs[current];
              // only populate with data once
              if (vm.gemMap[vm.activeTab].initial === true) {
                  msApi.request('gem-browse@get', {category : $stateParams.category, sub_category : vm.activeTab},
                      function(response)
                      {
                        vm.gemMap[vm.activeTab].gems = response.results;
                        vm.gemMap[vm.activeTab].initial = false;
                      },
                      function (error)
                      {
                        console.log(error);
                      }
                  );
                }
            }

          }
        });

        /********************************************
          Get tab names from the categories constant
        /*******************************************/
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

        /********************************************
          Create a data structure where gems are
          organized by their respective categories
        /*******************************************/
        function parseGemCategories() {
          var gemMap = vm.tabs.reduce(function(map, category) {
            map[category] = {initial: true, gems: []};
            return map;
          }, {});
          return gemMap;
        }
      }

})();
