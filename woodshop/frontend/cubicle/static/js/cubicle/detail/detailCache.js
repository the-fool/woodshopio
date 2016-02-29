(function (ng) {
	'use strict';
	var app = ng.module('cubicle.detail');

	app.factory('DetailGemCache', ['Gem', '$routeParams', function(Gem, $routeParams) {
		var gemCache = {};
		var picturesCache = {};
		var Service = {
			getGem: function(cb, force) {
				if (force || gemCache.id !== $routeParams.id) {
					Gem.query({id:$routeParams.id}).$promise.then(function(data) {
						gemCache = data;
						cb(gemCache);
					});
				}
				else cb(gemCache);
			},
			getPictures: function(cb, force) {
				if (force || picturesCache.id !== $routeParams.id) {
					Gem.fetchPictures({id:$routeParams.id}).$promise.then(function(data) {
						picturesCache = data.results;
						cb(picturesCache);
					});
				}
				else cb(picturesCache);
			}
		};
		return Service;
	}]);

})(angular);