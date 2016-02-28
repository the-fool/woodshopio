(function(ng) {
	var app = ng.module('cubicle.sidebar', ['api', 'cubicle.detail']);

	var partialUrl = '/static/js/cubicle/partials/';
	
	app.directive('cubicleSidebarGemList', ['Gem', 'DetailGemCache', '$location', function(Gem, DetailGemCache, $location) {
		
		function ctrl() {
			this.gems = [];
			this.setDetail = function(gemID) {
				$location.path('/gem/' + gemID);
			};
		};
		return {
			restrict: 'E',
			templateUrl: partialUrl + 'sidebar_gem_list.html',
			scope:  true,
			bindToController: true,
			controller: ctrl,
			controllerAs: 'vm',
			replace: true,
			link: function(scope, element, attrs) {
				scope.$watch(attrs.user, function(value) {
					if (value) {
						Gem.query({vendor:value.id}).$promise.then(function(data) {
							scope.vm.gems = data.results;
							$('#side-menu').metisMenu(); // need to apply event bindings
						});
					}
				});
			}
		};

	}]);
})(angular);