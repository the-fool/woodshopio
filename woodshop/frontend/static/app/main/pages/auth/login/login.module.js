(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider.state('app.pages-auth-login', {
            url      : '/pages/auth/login',
            views    : {
                'main@'                          : {
                    templateUrl: 'static/app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages-auth-login': {
                    templateUrl: 'static/app/main/pages/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });
        // Translation
        $translatePartialLoaderProvider.addPart('static/app/main/pages/auth/login');
    }

})();
