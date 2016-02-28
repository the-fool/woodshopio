(function(ng) {
	'use strict';
	var partialUrl = '/static/partials/modals/';
	var app = ng.module('modals', ['django.auth']);

	app.factory('modalService', function() {
		var svc = {};
		svc.login = false;
		svc.image = false;

        svc.openModal = function(which) {
        	switch (which) {
        		case 'login':
        			this.login = !this.login;
        			break;
        		case 'image':
        			this.image = !this.image;
        			break;		
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

	app.directive('loginModal', ['djangoAuth', 'Validate', '$location', function(djangoAuth, Validate, $location) {
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