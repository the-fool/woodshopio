(function ()
{
    'use strict';

    angular
        .module('app.bazaar.detail', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider)
    {
        // State
        $stateProvider
            .state('app.bazaar-detail', {
                url    : '/detail/{gemId}/',
                views  : {
                    'content@app': {
                        templateUrl: 'static/app/main/bazaar/detail/detail.html',
                        controller : 'BazaarDetailController as vm'
                    }
                },
                resolve: {
                    GemDetailData: function ($stateParams, msApi)
                    {
                        return msApi.resolve('bazaar-detail@get', {id: $stateParams.gemId});
                    },
                    GemPhotos: function($stateParams, msApi)
                    {
                      return msApi.resolve('gem-photos@get', {id: $stateParams.gemId});
                    },
                    GemReviews: function($stateParams, msApi)
                    {
                      return msApi.resolve('gem-reviews@get', {id: $stateParams.gemId});
                    }
                }
            });

        // Api
        msApiProvider.register('bazaar-detail', ['api/v1/gems/:id/']);
        msApiProvider.register('gem-photos', ['api/v1/gems/:id/pictures/']);
        msApiProvider.register('gem-reviews', ['api/v1/gems/:id/reviews/']);

    }
})();
