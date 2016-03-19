(function ()
{
    'use strict';

    angular
        .module('app.bazaar.filtered')
        .directive('filteredGemCardMd', filteredGemCardMd);

    /** @ngInject */
    function filteredGemCardMd()
    {
        return {
            restrict: 'E',
            scope   : {
                gem : '=gem',
                vm  :  '=vm'
            },
            templateUrl: '/static/app/main/bazaar/filtered/directives/filtered-gem-card-md/filtered-gem-card-md.html',
            compile : function (tElement)
            {
                // Add class
                tElement.addClass('ms-card');
            }
        };
    }
})();
