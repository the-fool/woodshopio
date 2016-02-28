(function (ng) {
	'use strict';
	var app = ng.module('cubicle.detail', ['api', 'ngRoute']);

	app.factory('DetailGemCache', ['Gem', '$routeParams', function(Gem, $routeParams) {
		var cache = {};
		var promise = null;
		var toCache = $routeParams.id;
		var Service = {
			getGem: function(cb) {
				if (cache.id !== $routeParams.id) {
					Gem.query({id:$routeParams.id}).$promise.then(function(data) {
						cache = data;
						cb(cache);
					});
				}
				else cb(cache);
			}
		};
		return Service;
	}]);

})(angular);