(function ()
{
  'use strict';

  angular
      .module('app.bazaar.detail')
      .controller('BazaarDetailController', BazaarDetailController);


      function BazaarDetailController(GemDetailData, GemPhotos) {

        var vm = this;
        vm.detail = GemDetailData;
        vm.images = GemPhotos.results.map(function(cv) {
          return cv.image;
        });
      }

})();
