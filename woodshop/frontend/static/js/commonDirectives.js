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

        var app = ng.module('auth.directives', ['modals']);
        app.directive('userDropdown', ['djangoAuth', '$rootScope', function(djangoAuth, scope) {

            function ctrl() {
                /*jshint validthis:true */
                var self = this;
                var delay = 700;
                $('#user-dropdown').on('click', '#logout-menu', function(e) {
                    e.stopPropagation();
                    setTimeout(function() {
                        $('#user-dropdown').click();
                        scope.$apply(self.message = '');
                    }, delay);
                });
                self.login = function() {
                    self.openModal({which:'login'});
                };
                self.logout = function() {
                    djangoAuth.logout().then(function() {
                        self.message = "You are signed out";
                    });
                };
            }
            return {
                templateUrl: partialUrl + 'user_dropdown.html',
                restrict: 'E',
                scope: {
                    authenticated:'=',
                    openModal: '&openModal'
                },
                controller: ctrl,
                controllerAs: 'user',
                replace: true,
                bindToController: true
            };
        }]);


})(angular);