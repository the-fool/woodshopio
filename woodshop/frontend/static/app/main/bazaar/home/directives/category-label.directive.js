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
        return {
            restrict: 'E',
            scope   : {
                categories: '=categories'
            },
            replace : true,
            template: '<span class="category-label"></span>',
            link : function (scope, element)
            {
              var mainCat = scope.categories[1] ? scope.categories[1].id : scope.categories[0].id;
              var cats = mainCat.split('_');
              // It seems a default empty value is required for subCategory,
              // otherwise the ui-route $compile will fill it in with extra information
              var ret = '<a ui-sref="app.bazaar-filtered({category:\'' + cats[0] + '\', subCategory: \'\'})">'+cats[0] + '</a>';
              if (cats[1]) {
                ret += ' : <a ui-sref="app.bazaar-filtered({category:\'' + cats[0] + '\', subCategory: \'' + cats[1] + '\'})">' + cats[1] + '</a>';
              }
              element.html(ret);
              $compile(element)(scope);
            }
        };
    }
})();
