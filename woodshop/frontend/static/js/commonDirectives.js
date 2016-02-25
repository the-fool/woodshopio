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

        var app = ng.module('auth.directives', ['ui.directives']);
        app.directive('userDropdown', ['djangoAuth', function(djangoAuth) {
            function ctrl() {
                /*jshint validthis:true */
                var self = this;
                self.login = function() {
                    self.openModal({which:'login'});
                }
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

        var app = ng.module('ui.directives', []);
        app.directive('modal', function() {
            return {
                templateUrl: partialUrl + 'ui_modal.html',
                restrict: 'E',
                transclude: true,
                replace:true,
                scope: true,
                link: function postLink(scope, element, attrs, parentCtrl) {
                    scope.title = attrs.title;

                    scope.$watch(attrs.visible, function(value){

                      if(value == true) 
                        $(element).modal('show');
                      else
                        $(element).modal('hide');
                    });
                    $(element).on('shown.bs.modal', function(){
                        scope.$apply(function(){
                            scope.$parent[attrs.visible] = true;
                        });
                    });

                    $(element).on('hidden.bs.modal', function(){
                        scope.$apply(function(){
                            scope.$parent[attrs.visible] = false;
                        });
                    });
                }
            }; 
        });
        var app = ng.module('modals', ['ui.directives', 'django.auth']);
        app.directive('loginModal', ['djangoAuth', 'Validate', function(djangoAuth, Validate) {
            function ctrl() {
                var self = this;
                self.model = {'username':'','password':''};
                self.complete = false;
                self.login = function(formData){
                    self.errors = [];
                    Validate.form_validation(formData,self.errors);
                    if(!formData.$invalid){
                        djangoAuth.login(self.model.username, self.model.password)
                        .then(function(data){
                            // success case
                            //$location.path("/");
                            },function(data){
                            // error case
                            self.errors = data;
                            });
                    }
                };
            }
            return {
                templateUrl: partialUrl + 'login_modal.html',
                controllerAs: 'vm',
                controller: ctrl,
               
            };
        }]);

})(angular);