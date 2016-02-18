(function (ng) {
    'use strict';

    var app = ng.module('bazaar.api', ['ngResource']);
    app.config(['$resourceProvider', function ($resourceProvider) {
        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);
    
    app.factory('Gem', [
        '$resource',
        function ($r) {
            return $r('/api/gems/:id/', {
                id: '@id'
            }, {
                query: {
                    method: 'GET',
                    isArray: false,
                }
            });
        }
    ]);

    app.factory('User', [
       '$resource',
        function ($r) {
            return $r('/api/users/:username', {
                username: '@username'
            });
       }
    ]);

})(angular);