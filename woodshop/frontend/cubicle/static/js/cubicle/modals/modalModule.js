(function(ng) {
	'use strict';
	var app = ng.module('cubicle.modals', ['modals', 'api', 'cubicle.detail']);
	var partialUrl = '/static/js/cubicle/modals/';


	app.directive('imageUploadModal', ['modalService', 'Picture', 'DetailGemCache', '$http', 
		function(modalService, Picture, DetailGemCache, $http) {
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
		function dataURItoBlob(dataURI) {
        	var split = dataURI.split(','),
            dataTYPE = split[0].match(/:(.*?);/)[1],
            binary = atob(split[1]),
            array = [];
        	for(var i = 0; i < binary.length; i++) {array.push(binary.charCodeAt(i));}
        	
        	return new Blob([new Uint8Array(array)], {
            	type: dataTYPE
        	});
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
			$('#upload').off('change').on('change', function () {
				$('.upload-result').css('display', 'block'); 
				readFile(this); 
			});
			$('.upload-result').css('display', 'none').off('click').on('click', function (ev) {
				$uploadCrop.croppie('result', {
					type: 'canvas',
					size: 'viewport'
				}).then(function (resp) {
					DetailGemCache.getGem(function(gem){
					    var fd = new FormData();
		                fd.append("image", dataURItoBlob(resp), "cropped-" + (new Date) + ".png");
		                fd.append("gem", gem.id);
		                $http({
		                	url: '/api/pictures/',
		                	method:'POST',
		                	headers: {
		                		'Content-Type': undefined,
		                	},
		                	data: fd,
		                	transformRequest: ng.identity

		                });
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