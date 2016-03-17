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
        console.log(BrowseGemData);

        // Methods

        //////////
    }
})();
