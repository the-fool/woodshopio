(function(ng) {
	var app = ng.module('bazaar.filters', []);
	app.filter('gridRowFilter', function() {
		return function(num_col, ind) {
			return index % num_col == 0;
		};
	});
})(angular);