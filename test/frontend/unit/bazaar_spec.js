'use strict';

describe('Bazaar app', function() {
	var bazaarTplDir = '/static/partials/bazaar_partials/';
	var commonTplDir = '/static/partials/common_partials/';
	beforeEach(module('common.services'));
	beforeEach(module('common.directives'));
	beforeEach(module('bazaar.directives'));
	beforeEach(module('bazaarApp'));

	describe('grab bag directive', function() {
		var scope, $compile, $httpBackend, grabBag, grabBagCtrl;

		beforeEach(module(commonTplDir + 'gem_thumb.html'));
		beforeEach(module(bazaarTplDir + 'grab_bag.html'));
		
		beforeEach(inject(function(_$httpBackend_, _$rootScope_, $compile) {	
			$httpBackend = _$httpBackend_;
			$httpBackend.when('GET', '/api/gems/').respond(
			{
			    "count": 6,
			    "next": null,
			    "previous": null,
			    "results": [
			        {
			            "id": "a7ad9716-e641-4b13-ac24-e4b777426c57",
			            "author": {
			                "id": "26fcd469-144b-4bdd-9a94-9991bb106a4e",
			                "username": "bob",
			                "first_name": "Bob",
			                "last_name": ""
			            },
			            "pictures": "http://localhost:8000/api/gems/a7ad9716-e641-4b13-ac24-e4b777426c57/pictures",
			            "main_picture": {
			                "image": "/media/gem_a7ad9716-e641-4b13-ac24-e4b777426c57/c6a08a07-2a74-4ff4-bed4-832341dca2c7.png"
			            },
			            "title": "Title #1",
			            "description": "This is text"
			        },
			        {
			            "id": "e5a7b92f-fbd5-4ade-93ba-f666eee512ec",
			            "author": {
			                "id": "7f511ba4-96cc-4e02-88d4-a08c08916f44",
			                "username": "sally",
			                "first_name": "Sally",
			                "last_name": ""
			            },
			            "pictures": "http://localhost:8000/api/gems/e5a7b92f-fbd5-4ade-93ba-f666eee512ec/pictures",
			            "main_picture": {
			                "image": "/media/gem_e5a7b92f-fbd5-4ade-93ba-f666eee512ec/8d839d4e-c1ee-4dc0-8445-d74fbcd4c43c.jpg"
			            },
			            "title": "Title #2",
			            "description": "Another thing I wanted to share"
			        },
			        {
			            "id": "d79dfbea-0f3e-4443-b72f-09291cd92c81",
			            "author": {
			                "id": "9ef24391-471e-4640-9af0-a63a308acfbd",
			                "username": "joe",
			                "first_name": "Joe",
			                "last_name": ""
			            },
			            "pictures": "http://localhost:8000/api/gems/d79dfbea-0f3e-4443-b72f-09291cd92c81/pictures",
			            "main_picture": {
			                "image": "/media/gem_d79dfbea-0f3e-4443-b72f-09291cd92c81/a8a49257-9d2b-4fbb-b858-43c6629249c8.jpg"
			            },
			            "title": "Title #3",
			            "description": "Guns guns guns"
			        },
			        {
			            "id": "04b24bbf-e561-43e2-9ddc-818dd4fd3b22",
			            "author": {
			                "id": "586aa006-9b3a-4807-8ed5-04f7b8d1281f",
			                "username": "rachel",
			                "first_name": "Rachel",
			                "last_name": ""
			            },
			            "pictures": "http://localhost:8000/api/gems/04b24bbf-e561-43e2-9ddc-818dd4fd3b22/pictures",
			            "main_picture": {
			                "image": "/media/gem_04b24bbf-e561-43e2-9ddc-818dd4fd3b22/2e7bf92f-9648-43db-b179-894d14c82c98.jpg"
			            },
			            "title": "Title #4",
			            "description": "Particle effects"
			        },
			        {
			            "id": "66a1569f-a43b-4528-acb0-e7aa871c1757",
			            "author": {
			                "id": "26fcd469-144b-4bdd-9a94-9991bb106a4e",
			                "username": "bob",
			                "first_name": "Bob",
			                "last_name": ""
			            },
			            "pictures": "http://localhost:8000/api/gems/66a1569f-a43b-4528-acb0-e7aa871c1757/pictures",
			            "main_picture": {
			                "image": "/media/gem_66a1569f-a43b-4528-acb0-e7aa871c1757/4868da90-f07b-4f8f-a9ec-69ee3cb0adaf.jpg"
			            },
			            "title": "Title #5",
			            "description": "5 dimensional terrain generator"
			        },
			        {
			            "id": "2f26d04d-e2ee-4629-8eb3-7337f0958129",
			            "author": {
			                "id": "7f511ba4-96cc-4e02-88d4-a08c08916f44",
			                "username": "sally",
			                "first_name": "Sally",
			                "last_name": ""
			            },
			            "pictures": "http://localhost:8000/api/gems/2f26d04d-e2ee-4629-8eb3-7337f0958129/pictures",
			            "main_picture": {
			                "image": "/media/gem_2f26d04d-e2ee-4629-8eb3-7337f0958129/6f85317b-4ad2-4a72-9b3b-c8f711b1036e.jpg"
			            },
			            "title": "Title #6",
			            "description": "Shrubs"
			        }
			    ]
			}
			);
			grabBag = $('<grab-bag></grab-bag>');
			scope = _$rootScope_.$new();
			$compile(grabBag)(scope);
			scope.$digest();
			$httpBackend.flush();
			grabBagCtrl = grabBag.isolateScope().grabBag;
		}));

		afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
		it('should render a gem-thumb', function() {
			expect(grabBag.find('gem-thumb').length).not.toBe(0);
		});
        it('should have 6 gems', function() {
        	expect(grabBag.find('gem-thumb').length).toBe(6);
        });

		
	});
});