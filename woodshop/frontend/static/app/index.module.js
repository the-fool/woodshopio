(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('woodshop', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Bazaar
            'app.bazaar',

            // Speciality full pages
            'app.pages'

        ]);
})();
