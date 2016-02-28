(function(ng) {
	'use strict';

	var app = ng.module('cubicle.detail');
	var partialUrl = '/static/js/cubicle/partials/';

	app.directive('detailEditor', ['Gem', 'DetailGemCache', function(Gem, DetailGemCache) {
		function ctrl() {
			this.gem = null;
			this.pictures = null;
			this.updateTitle = function(title) {
				Gem.update({id:this.gem.id, title:title});
			};

			
			// initialization
			(function() {
				DetailGemCache.getGem(function(data) {
					this.gem = data;
				}.bind(this));
				DetailGemCache.getPictures(function(data) {
					this.pictures = data;
					setTimeout(function() {
	                  $('#slider').flexslider({
	                    animation: "slide",
	                    controlNav: "thumbnails",
	                    directionNav: false,
	                    animationLoop: false,
	                    slideshow: false,
	                    start: function(slider){
	                    	$('#slider').append('<ul class="flex-editor-nav"><li><a class="edit-icon">Hello?</a></li></ul>');
	                      	$('#detail-editor').removeClass('loading').addClass('loaded');
	                    }
	                  });
	                },1);
				}.bind(this))
			}.bind(this))();
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