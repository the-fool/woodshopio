(function ()
{
    'use strict';

    angular
        .module('woodshop')
        .config(config);

    /** @ngInject */
    function config($httpProvider)
    {
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }

})();
