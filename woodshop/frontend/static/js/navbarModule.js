(function(ng) {
    var app = ng.module('navbar', ['modals', 'django.auth']);
    var partialUrl = '/static/partials/navbar/';
    app.directive('userDropdown', ['djangoAuth', function(djangoAuth) {

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