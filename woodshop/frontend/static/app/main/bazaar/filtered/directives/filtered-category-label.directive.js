(function ()
{
    'use strict';

    angular
        .module('app.bazaar.home')
        .directive('filteredCategoryLabel', filteredCategoryLabel);

    /** @ngInject */
    function filteredCategoryLabel($compile)
    // renders a category id into hyperlinks to filtered views
    {
        return {
            restrict: 'E',
            scope   : {
                categories: '=categories',
                vm : '=vm'
            },
            replace : true,
            template: '<span class="category-label"></span>',
            link : function (scope, element)
            {
              var mainCat = scope.categories[1] ? scope.categories[1].id : scope.categories[0].id;
              var cats = mainCat.split('_');
              // It seems a default empty value is required for subCategory,
              // otherwise the ui-route $compile will fill it in with extra information
              var ret = '<a href="" ng-click=\'vm.selectTab(\"' + cats[0] + '\");\'>'+ cats[0] + '</a>';
              if (cats[1]) {
                ret += ' : <a href="" ng-click=\'vm.selectTab(\"' + cats[1] + '\");\'>'+ cats[1] + '</a>';
              }
              element.html(ret);
              $compile(element.contents())(scope);
            }
        };
    }
})();
