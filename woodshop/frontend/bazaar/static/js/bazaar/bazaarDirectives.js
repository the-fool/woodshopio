(function (ng) {
        'use strict';

        var app = ng.module('bazaarApp');
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

        app.directive('reviewsViewer', ['Review', function(Review) {
            function ctrl () {
             
            }

            return {
              templateUrl: partialUrl + 'review_viewer.html',
              restrict: 'E',
              scope: true,
              controller: ctrl,
              controllerAs: 'vm',
              bindToController: {},
              link: function getReviews(scope, element, attrs, parentCtrl) {
                scope.gem = attrs.gem;
                scope.$watch(attrs.gem, function(value){
                  if (value) {
                   Review.query({gemid:value}).$promise.then(function(data) {
                    scope.vm.reviews = data.results;
                  });
                 }
               });
              }
            };
        }]);

        app.directive('reviewWriter', ['Review', 'DetailGemCache', function(Review) {
            function ctrl() {
                this.model = {author:'', title:'', rating:'', gem: '', text: ''};
                this.submit = function() {
                    this.model.author = this.user.id;
                    console.log(this.model);
                    Review.post(this.model);
                }
            }
            function link(scope, element, attrs) {
                scope.vm.model.gem = attrs.gem;
                scope.$watch(attrs.gem, function(value){
                    if (value) {
                        scope.vm.model.gem = value;
                    }
                });
            }

            return {
                restrict: 'E',
                scope: {
                    user: '='
                },
                controller: ctrl,
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: partialUrl + 'write_review.html',
                link: link
            }

        }]);
        app.directive('bazaarBanner', ['$route', '$rootScope', '$location', function($route, $rootScope, $location) {
            function ctrl() {

            }

            function link(scope,element,attrs) {
               function setBanner () {
                    if ($location.path() === '/home') {
                       scope.vm.home = true;
                       affixNav($('#banner').height());
                    } else {
                        scope.vm.home = false;
                        affixNav('0');
                    }
               };
               function affixNav(height) {
                    $('#topnavbar').affix({offset:{top:height}});
               }
               /*
                I am having trouble with dynamically setting the affix, so skip it!
               scope.$on('$routeChangeStart', function(event, next) {
                   setBanner(); 
                });
                setBanner();
                 */
               // stand-in code
               affixNav($('#banner').height());
               scope.vm.home = true;

            }
            return {
                restrict: 'AE',
                link: link,
                templateUrl: partialUrl + 'bazaar_banner.html',
                scope: {},
                controller: ctrl,
                controllerAs: 'vm',
                bindToController: true
            }
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
                            itemWidth: 110,
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
                    Gem.query({id:$r.id}).$promise.then(function(data) {
                        self.gem = data;
                        cache.setGem(data);
                        populatePictures(self.gem.pictures);
                    });
                } else {
                    populatePictures(this.gem.pictures);
                }
            }
            return {
                templateUrl: partialUrl + 'detail_summary.html',
                restrict: 'E',
                scope: {
                    user: '='
                },
                controller: ctrl,
                controllerAs: 'summary',
                bindToController: true
            };

        }]);

        app.directive('advertSlider', ['Gem', function(Gem) {
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
                        this.adverts = data.results.slice(0,5);
                        initSlider();
                    }.bind(this));
                } else {initSlider();}
            }

            return {
                templateUrl: partialUrl + 'advert_slider.html',
                restrict: 'E',
                scope: {},
                controller: ctrl,
                controllerAs: 'advertSlider',
                bindToController: true
            }
        }]);
})(angular);