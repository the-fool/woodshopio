(function ()
{
    'use strict';

    angular
        .module('app.bazaar.home', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.bazaar-home', {
                url    : '/home',
                views  : {
                    'content@app': {
                        templateUrl: 'static/app/main/bazaar/home/home.html',
                        controller : 'BazaarHomeController as vm'
                    }
                },
                resolve: {
                    BazaarHomeData: function (msApi)
                    {
                        return msApi.resolve('bazaar-home@get');
                    },
                    BrowseGemData: function (msApi)
                    {
                      return msApi.resolve('gem-browse@get');
                    }
                }
            });

        // Api
        msApiProvider.register('bazaar-home', ['static/app/data/bazaar/bazaar.json']);

    }
})();
