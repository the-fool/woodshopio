(function(ng) {
	'use strict';
	var partialUrl = '/static/partials/common_partials/';
	app = ng.module('reviews', ['ngResource']);

	app.config(['$resourceProvider', function ($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);
	app.factory('Review', [
		'$resource', 
		function($r){
			return $r('/api/gems/:gemid/reviews/:reviewid', {
                gemid: '@gemid',
                reviewid: '@reviewid'
            }, {
            	query: {
                    method: 'GET',
                    isArray: false,
                }
            });
		}
	]);

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