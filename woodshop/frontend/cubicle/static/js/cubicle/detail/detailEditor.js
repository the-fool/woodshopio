(function(ng) {
	'use strict';

	var app = ng.module('cubicle.detail');
	var partialUrl = '/static/js/cubicle/partials/';

	app.directive('detailEditor', ['Gem', 'DetailGemCache', '$rootScope', function(Gem, DetailGemCache, $rootScope) {
		function ctrl() {
			this.gem = null;
			this.pictures = null;
			DetailGemCache.getGem(function(data) {
				this.gem = data;
			}.bind(this));
			DetailGemCache.getPictures(function(data) {
				$rootScope.$applyAsync(this.pictures = data);
				console.log(this.pictures);
				setTimeout(function() {
                    $('#carousel').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    itemWidth: 210,
                    itemMargin: 5,
                    asNavFor: '#slider'
                  });
                  $('#slider').flexslider({
                    animation: "fade",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    sync: "#carousel",
                    start: function(slider){
                      $('body').removeClass('loading');
                    }
                  });
                },20);
			}.bind(this));
		}
		function link() {

		}
		return {
			restrict: 'E',
			templateUrl: partialUrl + 'detail_editor.html',
			scope: {
				user: '='
			},
			controller: ctrl,
			controllerAs: 'vm',
			bindToController: true,
			link: link
		};

	}]);

})(angular);