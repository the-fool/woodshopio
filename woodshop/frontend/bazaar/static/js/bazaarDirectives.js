(function (ng) {
        'use strict';

        var app = ng.module('bazaar.directives', ['bazaar.api']);
        var partialUrl = '/static/bazaar_partials/';

        app.directive('gemThumb', ['DetailGemCache', function(cache) {
            function ctrl() {
                this.setDetail = function() {
                    cache.setGem(this.gem);
                };
            }
            return {
                templateUrl: partialUrl + 'gem_thumb.html',
                restrict: 'E',
                scope: {
                    img_src: '@',
                    gem: '=',
                },
                controller: ctrl,
                controllerAs: 'gemThumb',
                bindToController: true
            };

        }]);
        app.directive('grabBag', ['Gem', function (Gem) {
            function ctrl() {
                /* jshint validthis: true */
                this.gems = [];
                //this.gridRowFilter = grf;
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

        app.directive('gemSummary', ['Gem', 'DetailGemCache', '$routeParams', function(Gem, cache, $r){
            function ctrl() {
                this.gem = cache.getGem();
                this.pictures = [];
                if (!Object.keys(this.gem).length) {
                    Gem.query({id:$r.id}).$promise.then( (data) => {
                        this.gem = data;
                    });
                }
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