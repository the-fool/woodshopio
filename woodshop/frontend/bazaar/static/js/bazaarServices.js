(function(ng) {
	app = ng.module('bazaar.services', ['api']);

	app.factory('GemsCache', ['Gem', function(Gem){
		var GemsCache = {};
		GemsCache.gems = [];
		GemsCache.category = '';
		
		Gem.query().$promise.then(function(data){
			GemsCache.gems = data.results;
		});

		GemsCache.getCategorical = function(category) {
			if (GemsCache.category !== category) {
				Gem.query({category:category}).$promise.then(function(data){
					GemsCache.gems = data.results;
					GemsCache.category = category;				
				});
			}
		}
		return GemsCache;
	}]);


	app.factory('DetailGemCache', function() {
		var Cache = {};
		var detailGem = {};

		Cache.setGem = function(gem) {
			detailGem = gem;
		};
		Cache.getGem = function() {
			return detailGem;
		};

		return Cache;
	});
	

})(angular);