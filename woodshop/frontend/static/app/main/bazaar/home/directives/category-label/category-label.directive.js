(function ()
{
    'use strict';

    angular
        .module('app.bazaar.home')
        .directive('categoryLabel', categoryLabel);

    /** @ngInject */
    function categoryLabel($compile)
    // renders a category id into hyperlinks to filtered views
    {
        function ctrl()
        {
          var vm = this;

          var mainCat = vm.categories[1] ? vm.categories[1].id : vm.categories[0].id;
          var cats = mainCat.split('_');

          // It seems a default empty value is required for subCategory,
          // otherwise the ui-route $compile will fill it in with extra information
          vm.html = '<a ui-sref="app.bazaar-filtered({category: \'' + cats[0] + '\', subCategory: \'\'})">'+cats[0] + '</a>';

          if (cats[1]) {
            vm.html += ' : <a ui-sref="app.bazaar-filtered({category: \'' + cats[0] + '\', subCategory: \'' + cats[1] + '\'})">' + cats[1] + '</a>';
          }

        }
        return {
            restrict: 'E',
            scope   : {
                categories: '=categories'
            },
            replace : true,
            template: '<span class="category-label"></span>',
            controller: ctrl,
            controllerAs: 'vm',
            bindToController: true,
            link : function (scope, element)
            {
              element.html(scope.vm.html)
              $compile(element)(scope);
            }
        };
    }
})();
