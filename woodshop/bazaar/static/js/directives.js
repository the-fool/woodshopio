(function (ng) {
        'use strict';

        var app = ng.module('bazaar.directives', ['bazaar.api']);
        var baseTplUrl = '/static/partials/';

        app.directive('grabBag', ['Gem', function (Gem) {
            function ctrl($scope) {
                /* jshint validthis: true */
                this.gems = [];
                
                // fat-arrow for lexical this-binding
                Gem.query().$promise.then( (data) => {
                    this.gems = data.results;
                });
            }
            
            return {
                templateUrl: baseTplUrl + 'grab_bag.html',
                restrict: 'E',
                scope: {},
                controller: ['$scope', ctrl],
                controllerAs: 'grabBag',
                bindToController: true
            };
    }]);

})(angular);