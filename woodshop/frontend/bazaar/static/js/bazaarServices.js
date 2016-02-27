(function(ng) {
	app = ng.module('bazaar.services',['common.services']);

	app.factory('GemsCache', ['Gem', '$rootScope', function(Gem, rs){
		var GemsCache = {};
		GemsCache.gems = [];
		GemsCache.category = '';
		
		Gem.query().$promise.then(function(data){
			GemsCache.gems = data.results;
		});

		GemsCache.getCategorical = function(category) {
			if (GemsCache.category !== category) {
				Gem.categorize({category:category}).$promise.then(function(data){
					GemsCache.gems = data.results;				
				});
			}
		}
		return GemsCache;
	}]);

	

})(angular);