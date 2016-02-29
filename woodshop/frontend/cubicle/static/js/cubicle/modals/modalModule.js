(function(ng) {
	'use strict';
	var app = ng.module('cubicle.modals', ['modals']);
	var partialUrl = '/static/js/cubicle/modals/';


	app.directive('imageUploadModal', ['modalService', function(modalService) {
		
		modalService.register('image', function onopen() {
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
					swal("Sorry - you're browser doesn't support the FileReader API");
				}
			}

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

			$('#upload').on('change', function () { readFile(this); });
			$('.upload-result').on('click', function (ev) {
				$uploadCrop.croppie('result', {
					type: 'canvas',
					size: 'viewport'
				}).then(function (resp) {
					popupResult({
						src: resp
					});
				});
			});
		}, function onclose() {
			$('#upload-cropper').croppie('destroy');
		});
		function ctrl() {

		}
		return {
				templateUrl: partialUrl + 'image_upload_modal.html',
				controllerAs: 'vm',
				controller: ctrl,
				link: link
			};
		}]);
})(angular);