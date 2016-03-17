(function ()
{
    'use strict';

    angular
        .module('app.bazaar', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.bazaar', {
                url    : '/bazaar',
                views  : {
                    'content@app': {
                        templateUrl: 'static/app/main/bazaar/bazaar.html',
                        controller : 'BazaarController as vm'
                    }
                },
                resolve: {
                    BazaarData: function (msApi)
                    {
                        return msApi.resolve('bazaar@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('static/app/main/bazaar');

        // Api
        msApiProvider.register('bazaar', ['static/app/data/bazaar/bazaar.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('woodshop', {
            title : 'BAZAAR',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('woodshop.bazaar', {
            title    : 'Bazaar',
            icon     : 'icon-tile-four',
            state    : 'app.bazaar',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'BAZAAR.BAZAAR_NAV',
            weight   : 1
        });
    }
})();
