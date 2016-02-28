(function(ng) {
	var app = ng.module('cubicle.sidebar', ['api']);

	var partialUrl = '/static/js/cubicle/partials/';
	
	app.directive('cubicleSidebarGemList', ['Gem', function(Gem) {
		
		function ctrl() {
			var uid = window.location.search.split('=')[1]; // BRITTLE!
			this.gems = [];
			Gem.query({vendor:uid}).$promise.then(function(data) {
				this.gems = data.results;
			});
		};
		return {
			restrict: 'E',
			templateUrl: partialUrl + 'sidebar_gem_list.html',
			scope: {
				user: '='
			},
			bindToController: true,
			controller: ctrl,
			controllerAs: 'vm'
		};

	}]);
})(angular);