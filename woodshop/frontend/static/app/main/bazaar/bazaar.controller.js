(function ()
{
    'use strict';

    angular
        .module('app.bazaar')
        .controller('BazaarController', BazaarController);

    /** @ngInject */
    function BazaarController(BazaarData)
    {
        var vm = this;

        // Data
        vm.helloText = BazaarData.data.helloText;

        // Methods

        //////////
    }
})();
