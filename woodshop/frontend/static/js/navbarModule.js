(function(ng) {
    var app = ng.module('navbar', ['modals', 'django.auth']);
    var partialUrl = '/static/partials/navbar/';
    
    app.directive('userDropdown', ['djangoAuth', 'modalService', '$rootScope', function(djangoAuth, modalService, $rootScope) {

        function ctrl() {
            /*jshint validthis:true */
            var self = this;
            var delay = 700;
            $('#user-dropdown').on('click', '#logout-menu', function(e) {
                e.stopPropagation();
                setTimeout(function() {
                    location.replace(location.origin + '/');
                }, delay);
            });
            self.login = function() {
                modalService.open('login');
            };
            self.logout = function() {
                djangoAuth.logout().then(function() {
                    self.message = "You are signed out";
                });
            };
            self.account = function() {
                modalService.open('account');
            }
        }
        return {
            templateUrl: partialUrl + 'user_dropdown.html',
            restrict: 'E',
            scope: {
                user:'=',
            },
            controller: ctrl,
            controllerAs: 'vm',
            replace: true,
            bindToController: true
        };
    }]);
})(angular);