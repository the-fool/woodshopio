(function ()
{
  'use strict';

  angular
      .module('app.bazaar.detail')
      .controller('BazaarDetailController', BazaarDetailController);


      function BazaarDetailController(GemDetailData, GemPhotos) {

        var vm = this;
        vm.gem = GemDetailData;
        vm.images = processImages();


        function processImages() {
          /** Simplifies the data structure,
              and sets the main picture as the first  **/
              
          var photos = GemPhotos.results;
          photos.forEach(function(element, index) {
            if (element.id === GemDetailData.main_picture.id) {
              var tmp = photos[index];
              photos[index] = photos[0];
              photos[0] = tmp;
            }
          });
          return photos.map(function(cv) {
            return cv.image;
          });
        }
    }
})();
