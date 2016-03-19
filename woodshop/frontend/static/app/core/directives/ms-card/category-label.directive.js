(function ()
{
    'use strict';

    angular
        .module('app.core')
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
              var ret = '<a ui-sref="app.bazaar-filtered({category:\''+ cats[0] + '\'})">'+cats[0] + '</a>';
              if (cats[1]) {
                ret += ' : <a ui-sref="app.bazaar-filtered({category:\'' + cats[1] + '\'})">' + cats[1] + '</a>';
              }
              element.html(ret);
              $compile(element)(scope);
            }
        };
    }
})();
