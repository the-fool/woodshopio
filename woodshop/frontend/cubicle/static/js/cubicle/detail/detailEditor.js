(function(ng) {
	'use strict';

	var app = ng.module('cubicle.detail');
	var partialUrl = '/static/js/cubicle/partials/';

	app.directive('detailEditor', ['Gem', 'DetailGemCache', 'modalService', '$rootScope', '$route', 
		function(Gem, DetailGemCache, modalService, $rootScope, $route) {
		function ctrl($rootScope) {
			this.gem = null;
			this.pictures = null;
			this.update = function(data, key) {
				var g = {id:this.gem.id};
				g[key] = data;
				Gem.update(g);
			};
			this.openImageUploadModal = function() {
				modalService.open('image');
			};

			this.populatePictures = function(force) {
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
				}.bind(this), force);
			};
			$rootScope.$on('image-uploaded', function(data) {
				$route.reload();
			}.bind(this));
			// initialization
			(function() {
				DetailGemCache.getGem(function(data) {
					this.gem = data;
				}.bind(this));
				this.populatePictures(true);	
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