(function (ng) {
    'use strict';
    
    var app = ng.module('bazaar.api', ['ngResource']);
    
    app.factory('Gem', [
        '$resource', function($r) {
         return $r('/api/gems/:id', {
            id: '@id'
         });
        }
    ]);
    
    app.factory('User', [
       '$resource', function($r) {
           return $r('/api/users/:username', {
               username: '@username'
           });
       } 
    ]);
    
})(angular);