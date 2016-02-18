(function (ng) {
        'use strict';

        var app = ng.module('bazaar.directives', ['bazaar.api']);
        var partialUrl = '/static/partials/';

        app.directive('grabBag', ['Gem', function (Gem) {
            function ctrl() {
                /* jshint validthis: true */
                this.gems = [];
                
                // fat-arrow for lexical this-binding
                Gem.query().$promise.then( (data) => {
                    this.gems = data.results;
                });
            }
            
            return {
                templateUrl: partialUrl + 'grab_bag.html',
                restrict: 'E',
                scope: {},
                controller: ctrl,
                controllerAs: 'grabBag',
                bindToController: true
            };
        }]);

        app.directive('summary', ['Gem', '$routeParams', function(Gem, $r){
            function ctrl() {
                this.title = '';
                this.description = '';
                Gem.query({id:$r.id}).$promise.then( (data) => {
                    console.log(data);
                    this.title=data.title;
                    this.description=data.description;
                });
            }

            return {
                templateUrl: partialUrl + 'detail_summary.html',
                restrict: 'E',
                scope: {},
                controller: ctrl,
                controllerAs: 'summary',
                bindToController: true
            };

        }]);

})(angular);