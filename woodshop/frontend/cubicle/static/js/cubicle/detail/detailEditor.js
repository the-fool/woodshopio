(function(ng) {
	'use strict';

	var app = ng.module('cubicle.detail');
	var partialUrl = '/static/js/cubicle/partials/';

	app.directive('detailEditor', ['Gem', 'Picture', 'DetailGemCache', 'modalService', '$rootScope', '$route', 
		function(Gem, Picture, DetailGemCache, modalService, $rootScope, $route) {
		function ctrl($rootScope) {
			var self = this;
			this.gem = null;
			this.pictures = null;
			this.update = function(data, key) {
				var g = {id:this.gem.id};
				g[key] = data;
				Gem.update(g);
			};
			this.openImageUploadModal = function() {
				modalService.open('image-upload');
			};
			this.openImageDeleteModal = function(imageID) {
				modalService.open('image-delete');
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

			$rootScope.$$listeners['image-uploaded']=[],
			$rootScope.$$listeners['image-deleted']=[];
			
			$rootScope.$on('image-uploaded', function() {
				$route.reload();
			});
			$rootScope.$on('image-deleted', function() {
				var $pic = $('#slider .flex-active-slide');
				var picID = $pic.data('id');
				Picture.delete({id:picID}).$promise.then(function(data) {
					// success
					$route.reload();
				}, function(error) {console.log('error', error)});;
			});

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