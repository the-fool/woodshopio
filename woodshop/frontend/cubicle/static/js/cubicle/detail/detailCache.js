(function (ng) {
	'use strict';
	var app = ng.module('cubicle.detail', ['api']);

	app.factory('DetailGemCache', function(Gem) {
		var cache = {};
		var Service = {
			setGem: function(gemID) {
				if (cache.id !== gemID) {
					Gem.get({id:gemID}).$promise.then(function(data) {
						console.log(data);
						cache = data;
					});
				}
			},
			getGem: function() {
				return cache;
			}

		};
		return Service;
	});

})(angular);