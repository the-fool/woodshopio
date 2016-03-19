(function ()
{
  angular
      .module('app.bazaar.filtered', [])
      .config(config)
      .run(runBlock);

  /** @ngInject */
  function config($stateProvider, msApiProvider, msNavigationServiceProvider, $translatePartialLoaderProvider)
  {
    // Translation
    $translatePartialLoaderProvider.addPart('static/app/main/bazaar/filtered');

    // State
    $stateProvider
        .state('app.bazaar-filtered', {
            url    : '/assets/{category}/{sub_category}',
            views  : {
                'content@app': {
                    templateUrl: 'static/app/main/bazaar/filtered/filtered.html',
                    controller : 'BazaarFilteredController as vm'
                }
            },
            resolve: {
                GemData: function ($stateParams, msApi)
                {
                    return msApi.resolve('gem-browse@get', {category: $stateParams.category, sub_category: $stateParams.sub_category});
                }
            }
        });
  }

  function runBlock(msNavigationService, CATEGORIES) {

    // Add categories to the navbar
    CATEGORIES.forEach(function(category) {
      msNavigationService.saveItem('categories.'+category[0], {
        title:    category[0],
        state:    'app.bazaar-filtered',
        weight:   1,
        stateParams: {category: category[0]}
      });
    });
  }

})();
