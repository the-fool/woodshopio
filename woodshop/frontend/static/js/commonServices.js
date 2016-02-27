(function (ng) {
    'use strict';

    var app = ng.module('common.services', ['ngResource']);
    
        app.factory('DetailGemCache', function() {
        var cache = {};
        var detailGem = {};
        
        cache.setGem = function(gem) {
            detailGem = gem;
        };
        cache.getGem = function() {
            return detailGem;
        };
        
        return cache;
    });

})(angular);