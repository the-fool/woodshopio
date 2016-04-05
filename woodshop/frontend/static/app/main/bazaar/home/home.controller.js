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
        /*
         *  Data
         *
         *  @BrowseGemData  : Pseudo-random collection of front-page gems
         *  @BazaarHomeData : Collection of news and promotion items
        */
        vm.gems = BrowseGemData.results;

        //////////
    }
})();
