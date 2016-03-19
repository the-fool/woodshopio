(function ()
{
    'use strict';

    angular
        .module('app.bazaar.home')
        .directive('gemCardMd', gemCardMd);

    /** @ngInject */
    function gemCardMd()
    {
        return {
            restrict: 'E',
            scope   : {
                gem : '=gem',
            },
            templateUrl: '/static/app/main/bazaar/home/directives/gem-card-md/gem-card-md.html',
            compile : function (tElement)
            {
                // Add class
                tElement.addClass('ms-card');

                return function postLink(scope, iElement)
                {
                    // Methods
                    scope.cardTemplateLoaded = cardTemplateLoaded;

                    //////////

                    /**
                     * Emit cardTemplateLoaded event
                     */
                    function cardTemplateLoaded()
                    {
                        scope.$emit('msCard::cardTemplateLoaded', iElement);
                    }
                };
            }
        };
    }
})();
