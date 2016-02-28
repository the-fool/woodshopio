(function(ng) {
	var app = ng.module('cubicle.sidebar', ['api', 'django.auth', 'cubicle.detail']);

	var partialUrl = '/static/js/cubicle/partials/';
	
	app.directive('cubicleSidebarGemList', ['Gem', 'djangoAuth', 'DetailGemCache', function(Gem, djangoAuth, DetailGemCache) {
		
		function ctrl() {
			this.gems = [];
			this.setDetail = function(gemID) {
				DetailGemCache.setGem(gemID);
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