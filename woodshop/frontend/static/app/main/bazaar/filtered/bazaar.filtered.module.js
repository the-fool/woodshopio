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

    msNavigationServiceProvider.saveItem('categories', {
        title    : 'Categories',
        group    : true,
        icon     : 'icon-tile-four',
        translate: 'BAZAAR.CATEGORIES_NAV',
        weight   : 1
    });
  }

  function runBlock(msNavigationService, CATEGORIES) {
    console.log('working?');
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
