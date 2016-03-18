(function ()
{
    'use strict';

    angular
        .module('app.bazaar.home')
        .controller('BazaarHomeController', BazaarHomeController);

    /** @ngInject */
    function BazaarHomeController(BazaarHomeData, BrowseGemData, CATEGORIES)
    {
        var vm = this;
        // Data
        vm.helloText = BazaarHomeData.data.helloText;
        vm.gems = BrowseGemData.results;
        vm.viewDetail = viewDetail;

        function viewDetail(id) {
          console.log(id);
        }

        //////////
    }
})();
