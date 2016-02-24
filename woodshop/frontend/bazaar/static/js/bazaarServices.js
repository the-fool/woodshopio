(function(ng) {
	app = ng.module('bazaar.services',['common.services']);

	app.factory('GemsCache', ['Gem', function(Gem){
		var GemsCache = {};

		GemsCache.getCategorical = function(category) {
			Gem.categorize({category:category}).$promise.then(function(data){
				console.log(data);
			});
		}
		return GemsCache;
	}]);

})(angular);