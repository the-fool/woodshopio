(function(ng) {
	'use strict';
	var app = ng.module('cubicle.modals', ['modals']);
	var partialUrl = '/static/js/cubicle/modals/';


	app.directive('imageUploadModal', function() {
		function ctrl() {
	
		}
		return {
			templateUrl: partialUrl + 'image_upload_modal.html',
			controllerAs: 'vm',
			controller: ctrl,

		};
	});
})(angular);