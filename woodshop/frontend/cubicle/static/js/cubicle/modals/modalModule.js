(function(ng) {
	'use strict';
	var app = ng.module('cubicle.modals', ['modals']);
	var partialUrl = '/static/js/cubicle/modals/';


	app.directive('pictureUploadModal', function() {
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