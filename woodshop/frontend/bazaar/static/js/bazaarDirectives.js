(function (ng) {
        'use strict';

        var app = ng.module('bazaar.directives', ['common.services', 'reviews']);
        var partialUrl = '/static/partials/bazaar_partials/';

        app.directive('categoryList', ['Gem', function(Gem) {
            function ctrl() {
                /* jshint validthis: true */
                this.setCategory = function(name) {
                    console.log('clicked ' + name);
                };
            }
            return {
                restrict: 'A',
                transclude: true,
                template: '<div ng-transclude></div>',
                scope: {},
                controller: ctrl,
                controllerAs: 'cat',
                bindToController: true
            };
        }]);

        app.directive('grabBag', ['GemsCache', '$rootScope', function (GemsCache, rs) {
            function ctrl() {
                /* jshint validthis: true */
                var self = this;
                this.gems = [];
            }            
            return {
                templateUrl: partialUrl + 'grab_bag.html',
                restrict: 'E',
                scope: {},
                controller: ctrl,
                controllerAs: 'grabBag',
                bindToController: true,
                link: function(scope) {
                    scope.$watchCollection(function() {
                        return GemsCache.gems;
                    }, function(gems) {
                        scope.grabBag.gems = gems;
                    });
                }
            };
        }]);

        app.directive('gemSummary', ['Gem', 'DetailGemCache', '$routeParams', '$http', function(Gem, cache, $r, $http){
            function ctrl() {
                /* jshint validthis: true */
                var self = this;
                this.gem = cache.getGem();
                this.pictures = [];

                function populatePictures(url) {
                     $http.get(url).then( function(response) {
                        response.data.results.forEach(function (v) {
                            self.pictures.push(v);
                        });
                        setTimeout(function() 
                            {  $('#pikame').pikachoose({carousel:true, autoPlay: false});},0);
                    }); 
                }

                if (!Object.keys(this.gem).length) {
                    Gem.query({id:$r.id}).$promise.then( function(data) {
                        self.gem = data;
                        populatePictures(self.gem.pictures);
                    });
                } else {
                    populatePictures(this.gem.pictures);
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