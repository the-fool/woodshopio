(function (ng) {
    'use strict';

    var app = ng.module('api', ['ngResource']);
    
    app.config(['$resourceProvider', function ($resourceProvider) {
        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);
    
    app.factory('Gem', [
        '$resource',
        function ($r) {
            return $r('/api/gems/:id/', { id: '@id' },  
            { 
                query: {
                    method: 'GET',
                    isArray: false,
                    params: {
                        category:'@category',
                        vendor:'@vendor'
                    }
                },  
                fetchPictures: {
                        url: '/api/gems/:id/pictures',
                        method: 'GET',
                        isArray: false,
                },
                update: {method: 'PATCH'}
            });
        }
        ]);

    app.factory('User', [
       '$resource',
       function ($r) {
        return $r('/api/users/:username', {
            username: '@username'
        });
    }
    ]);
    app.factory('Picture', [
        '$resource',
        function($r) {
            return $r('/api/pictures/:pictureid', {
                pictureid: '@id'
            }, {
                query: {
                    method: 'GET',
                    isArray: false,
                    params: {
                        gem: '@gem'
                    }
                }
            });
        }
        ]);

    app.factory('Review', [
        '$resource', 
        function($r){
            return $r('/api/gems/:gemid/reviews/:reviewid', {
                gemid: '@gemid',
                reviewid: '@reviewid'
            }, {
                query: {
                    method: 'GET',
                    isArray: false,
                }
            });
        }
        ]);

    app.service('Validate', function Validate() {
        return {
            'message': {
                'minlength': 'This value is not long enough.',
                'maxlength': 'This value is too long.',
                'email': 'A properly formatted email address is required.',
                'required': 'This field is required.'
            },
            'more_messages': {
                'demo': {
                    'required': 'Here is a sample alternative required message.'
                }
            },
            'check_more_messages': function(name,error){
                return (this.more_messages[name] || [])[error] || null;
            },
            validation_messages: function(field,form,error_bin){
                var messages = [];
                for(var e in form[field].$error){
                    if(form[field].$error[e]){
                        var special_message = this.check_more_messages(field,e);
                        if(special_message){
                            messages.push(special_message);
                        }else if(this.message[e]){
                            messages.push(this.message[e]);
                        }else{
                            messages.push("Error: " + e)
                        }
                    }
                }
                var deduped_messages = [];
                angular.forEach(messages, function(el, i){
                    if(deduped_messages.indexOf(el) === -1) deduped_messages.push(el);
                });
                if(error_bin){
                    error_bin[field] = deduped_messages;
                }
            },
            'form_validation': function(form,error_bin){
                for(var field in form){
                    if(field.substr(0,1) != "$"){
                        this.validation_messages(field,form,error_bin);
                    }
                }
            }
        };
    });

})(angular);