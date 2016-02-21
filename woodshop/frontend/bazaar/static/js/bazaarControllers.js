(function (ng) {
	'use strict';
	var app = ng.module('bazaar.controllers', []);
	//console.log(app);
	app.controller('bazaarController', function() {
		this.detail_gem = null;
		this.setDetail = function(gem) {
			console.log('it works');
			console.log(gem);
		};
	});

}) (angular);