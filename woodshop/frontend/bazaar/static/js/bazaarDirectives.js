(function (ng) {
        'use strict';

        var app = ng.module('bazaar.directives', ['common.api']);
        var partialUrl = '/static/bazaar_partials/';

        app.directive('grabBag', ['Gem',  function (Gem) {
            function ctrl() {
                /* jshint validthis: true */
                this.gems = [];
                // fat-arrow for lexical this-binding
                this.gemRows = (num_col) => {
                    var ret=[], i = 0;
                    this.gems.forEach(function(val, ind) {
                        if (ind % num_col === 0) {
                            ret[i++] = [val];
                        } else {
                            ret[i - 1].push[val];
                        }
                    });
                    return ret;
                };
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

        app.directive('gemSummary', ['Gem', 'DetailGemCache', '$routeParams', '$http', function(Gem, cache, $r, $http){
            function ctrl() {
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
                    Gem.query({id:$r.id}).$promise.then( (data) => {
                        this.gem = data;
                        populatePictures(this.gem.pictures);
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