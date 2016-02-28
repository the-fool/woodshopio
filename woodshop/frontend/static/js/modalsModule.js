(function(ng) {
	'use strict';
	var partialUrl = '/static/partials/modals/';
	var app = ng.module('modals', ['django.auth']);

	app.factory('modalService', function() {
		var svc = {};

        svc.register = function(name) {
        	svc[name] = false;
        };
        svc.open = function(name) {
        	if (name in svc) {
        		svc[name] = !svc[name];
        	} else {
        		console.log('no modal registered under name <' + name + '>');
        	}
        };

        return svc;
	});

	app.directive('modal', ['modalService', function(modalService) {
		return {
			templateUrl: partialUrl + 'modal.html',
			restrict: 'E',
			transclude: true,
			replace:true,
			scope: {},
			link: function postLink(scope, element, attrs, parentCtrl) {
				scope.title = attrs.title;
				var which = attrs.which;
				
				scope.$watch(function() {return modalService[which]}, function(value){
					if(value == true) 
						$(element).modal('show');
					else
						$(element).modal('hide');
				});
				$(element).on('shown.bs.modal', function(){
					scope.$apply(function(){
						modalService[which] = true;
					});
				});

				$(element).on('hidden.bs.modal', function(){
					scope.$apply(function(){
						modalService[which] = false;
					});
				});
			}
		}; 
	}]);

	app.directive('loginModal', ['djangoAuth', 'Validate', 'modalService', function(djangoAuth, Validate, modalService) {
		modalService.register('login');
		function ctrl() {
			var self = this;
			self.model = {'email':'','password':''};
			self.complete = false;
			self.login = function(formData){
				self.errors = [];
				Validate.form_validation(formData,self.errors);
				if(!formData.$invalid){
					djangoAuth.login(self.model.email, self.model.password)
					.then(function(data){
                            // success case
                            self.success = "You are logged in";
                            setTimeout(function() {
                            	$('.modal').modal('hide');
                            	self.success = undefined;
                            }, 500);
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