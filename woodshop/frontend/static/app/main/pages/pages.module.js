(function()
{
  'use strict';

  angular
      .module('app.pages', [
        'app.pages.auth.login'
      ])
      .config(config);

      /** @ngInject */
      function config() {

      }
})();
