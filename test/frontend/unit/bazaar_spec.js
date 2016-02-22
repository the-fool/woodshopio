'use strict';

describe('Bazaar app', function() {
   var tplDir = 'woodshop/frontend/bazaar/static/bazaar_partials';
   beforeEach(module('bazaarApp'));
   beforeEach(module('commonServices'));
   beforeEach(module('commonFilters'));
   beforeEach(module('commonDirectives'));

   it('should load', function() {
      expect(1).toBe(1); 
   });
    
});