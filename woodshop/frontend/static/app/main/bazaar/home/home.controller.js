(function ()
{
    'use strict';

    angular
        .module('app.bazaar.home')
        .controller('BazaarHomeController', BazaarHomeController);

    /** @ngInject */
    function BazaarHomeController(BazaarHomeData, BrowseGemData, CATEGORIES, $state)
    {
        var vm = this;
        // Data
        vm.helloText = BazaarHomeData.data.helloText;
        vm.gems = BrowseGemData.results;

        //////////
    }
})();
