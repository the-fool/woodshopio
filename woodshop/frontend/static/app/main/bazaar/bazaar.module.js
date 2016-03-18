(function ()
{
  'use strict';

  angular
      .module('app.bazaar', [
        'app.bazaar.home',
        'app.bazaar.detail'
      ])
      .config(config);

      /** @ngInject */
      function config(msApiProvider) {
        msApiProvider.register('gem-browse', ['api/v1/gems/']);
      }
})();
