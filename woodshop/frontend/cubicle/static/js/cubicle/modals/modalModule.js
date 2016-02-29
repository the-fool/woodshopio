(function(ng) {
	'use strict';
	var app = ng.module('cubicle.modals', ['modals', 'api', 'cubicle.detail']);
	var partialUrl = '/static/js/cubicle/modals/';


	app.directive('imageUploadModal', ['modalService', 'Picture', 'DetailGemCache', function(modalService, Picture, DetailGemCache) {
		var $uploadCrop;
		function readFile(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function (e) {
					$uploadCrop.croppie('bind', {
						url: e.target.result
					});
					$('.upload-demo').addClass('ready');
				}
				reader.readAsDataURL(input.files[0]);
			}
			else {
				alert("Sorry - you're browser doesn't support the FileReader API");
			}
		}

		modalService.register('image', function onopen() {
			$uploadCrop = $('#upload-cropper').croppie({
				viewport: {
					width: 400,
					height: 300,
					type: 'square'
				},
				boundary: {
					width: 800,
					height: 600
				},
				exif: true
			});
			$('#upload').off('change').on('change', function () { readFile(this); });
			$('.upload-result').off('click').on('click', function (ev) {
				$uploadCrop.croppie('result', {
					type: 'canvas',
					size: 'viewport'
				}).then(function (resp) {
					DetailGemCache.getGem(function(gem){
						Picture.save({image:resp, gem:gem.id});
					});
				});
			});
		}, function onclose() {
			$('#upload-cropper').croppie('destroy');
		});

		function ctrl() {
			var self = this;
			DetailGemCache.getGem(function(gem) {
				self.gem = gem;
			});
			

		}
		return {
				templateUrl: partialUrl + 'image_upload_modal.html',
				controllerAs: 'vm',
				controller: ctrl,
			};
		}]);
})(angular);