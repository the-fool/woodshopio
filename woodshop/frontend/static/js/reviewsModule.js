(function(ng) {
	'use strict';
	var partialUrl = '/static/partials/common_partials/';
	
    var app = ng.module('reviews', ['api']);

	app.directive('reviewsViewer', ['Review', function(Review) {
		function ctrl () {
	
		}

		return {
                templateUrl: partialUrl + 'reviews.html',
                restrict: 'E',
                scope: true,
                controller: ctrl,
                controllerAs: 'vm',
                bindToController: {},
                link: function getReviews(scope, element, attrs, parentCtrl) {
                    scope.gem = attrs.gem;
                    scope.$watch(attrs.gem, function(value){
                      if (value) {
                      	Review.query({gemid:value}).$promise.then(function(data) {
                      		scope.vm.reviews = data.results;
                      	});
                      }
                    });
                }
            };
	}]);

})(angular);