(function()
{
    'use strict'

    angular
      .module('app.bazaar.detail')
      .directive('detailSlider', detailSlider);

    function detailSlider($timeout) {

      return {
        restrict: 'E',
        templateUrl: 'static/app/main/bazaar/detail/directives/detail-slider/detail-slider.html',
        scope: {
          images: '=images'
        },
        link: function(scope, element) {
          var thumbnailWidth = $(window).width() < 600 ? 100 : 200;
          $timeout(function() {
            $('#carousel').flexslider({
              animation: "slide",
              controlNav: false,
              animationLoop: false,
              slideshow: false,
              itemWidth: thumbnailWidth,
              itemMargin: 5,
              asNavFor: '#slider'
            });

            $('#slider').flexslider({
              animation: "slide",
              controlNav: false,
              animationLoop: false,
              slideshow: false,
              sync: "#carousel"
            });
          });
        }
      };
    }
})();
