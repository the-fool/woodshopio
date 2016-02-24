(function (ng) {
        'use strict';
        /* Requires common.services */
        var app = ng.module('common.directives', ['common.services']);
        var partialUrl = '/static/partials/common_partials/';

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

        //app.directive('categoryList');

        

})(angular);