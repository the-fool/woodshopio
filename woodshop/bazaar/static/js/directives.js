(function (ng) {
        'use strict';

        var app = angular.module('bazaar.directives', ['bazaar.api']);
        var baseTplUrl = '/static/partials/';

        app.directive('grabBag', ['Gem', function (Gem) {
            function ctrl() {
                /* jshint validthis: true */
                this.gems = Gem.query();
            }
            
            return {
                templateUrl: baseTplUrl + 'grab_bag.html',
                scope: {},
                controller: ctrl,
                controllerAs: 'grabBag',
                bindToController: true
            };
    }]);

}(angular);