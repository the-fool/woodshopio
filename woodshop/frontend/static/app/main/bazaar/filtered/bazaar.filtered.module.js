(function ()
{
  angular
      .module('app.bazaar.filtered', [])
      .config(config);

  /** @ngInject */
  function config($stateProvider, msApiProvider, msNavigationServiceProvider)
  {
    msNavigationServiceProvider.saveItem('categories', {
        title    : 'Categories',
        group    : true,
        icon     : 'icon-tile-four',
        translate: 'BAZAAR.CATEGORIES_NAV',
        weight   : 1
    });
  }
})();
