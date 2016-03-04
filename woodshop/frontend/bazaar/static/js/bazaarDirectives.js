(function (ng) {
        'use strict';

        var app = ng.module('bazaar.directives', ['bazaar.services', 'reviews']);
        var partialUrl = '/static/partials/bazaar_partials/';


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

        app.directive('gemThumb', ['DetailGemCache', function(cache) {

            function ctrl() {
                /*jshint validthis:true */
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
                        setTimeout(function() {
                            $('#carousel').flexslider({
                            animation: "slide",
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            itemWidth: 210,
                            itemMargin: 5,
                            asNavFor: '#slider'
                          });
                          $('#slider').flexslider({
                            animation: "fade",
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            sync: "#carousel",
                            start: function(slider){
                              $('banner').removeClass('loading');
                            }
                          });
                        },1);
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

        app.directive('banner', ['Gem', function(Gem) {
            // simple cache, 
            // since we don't expect adverts to change during a session
            var adverts = [];

            /* Gets the advertisement objects */
            /* (for now, it just gets gems) */
            function getBanner() {
                return Gem.query().$promise;
            }
            
            function initSlider() {
                setTimeout(function() {
                  $('.flexslider').flexslider({
                    animation: "slide",
                    controlsContainer: $(".custom-controls-container"),
                    customDirectionNav: $(".custom-navigation a"),
                    slideshowSpeed: 5000,
                    start: function(slider){
                      $('body').removeClass('loading');
                    }
                });
                }, 50);
            }

            function ctrl() {
                this.adverts = adverts;
                if (adverts.length === 0) {
                    getBanner().then(function(data){
                        console.log(data);
                        this.adverts = data.results.slice(0,5);
                        initSlider();
                    }.bind(this));
                } else {initSlider();}
            }

            return {
                templateUrl: partialUrl + 'banner.html',
                restrict: 'E',
                scope: {},
                controller: ctrl,
                controllerAs: 'banner',
                bindToController: true
            }
        }]);
})(angular);