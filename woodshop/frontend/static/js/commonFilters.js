(function(ng) {
	var app = ng.module('common.filters', []);
	app.filter('gridRow', function() {
		// props to Michael Perrin
        var cacheInputs = [];
        var cacheResults = [];

        return function(input, size) {
            var index = cacheInputs.indexOf(input);

            if (index !== -1) {
                return cacheResults[index];
            }

            var result = [];

            for (i = 0; i < input.length; i += size) {
                result.push(input.slice(i, i + size));
            }

            cacheInputs.push(input);
            cacheResults.push(result);

            return result;
        };
    });
})(angular);