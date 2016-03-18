(function ()
{
  'use strict';

  angular
      .module('app.bazaar', [
        'app.bazaar.home',
        'app.bazaar.detail',
        'app.bazaar.filtered'
      ])
      .config(config);

      /** @ngInject */
      function config(msApiProvider, msNavigationServiceProvider, $translatePartialLoaderProvider) {

        // Translation
        $translatePartialLoaderProvider.addPart('static/app/main/bazaar');

        // General API endpoints
        msApiProvider.register('gem-browse', ['api/v1/gems/']);

        // Navigation
        msNavigationServiceProvider.saveItem('home', {
            title    : 'Browse',
            icon     : 'icon-tile-four',
            state    : 'app.bazaar-home',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'BAZAAR.BAZAAR_NAV',
            weight   : 1
        });

        msNavigationServiceProvider.saveItem('categories', {
            title    : 'Categories',
            icon     : 'icon-tile-four',
            translate: 'BAZAAR.CATEGORIES_NAV',
            weight   : 2
        });
      }

})();
