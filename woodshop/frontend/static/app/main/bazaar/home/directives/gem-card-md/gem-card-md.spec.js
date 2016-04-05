describe("gemCardMd directive", function() {

  var elm
    , scope
    , $compile
    , mockGem
    ;

  beforeEach(module('app.bazaar.home'));
  beforeEach(module('templates'));

  beforeEach(inject(function($rootScope, _$compile_, $templateCache)
  {
    $compile = _$compile_;
    scope = $rootScope.$new();
    elm = angular.element('<gem-card-md gem="gem"></gem-card-md>');
    console.log($templateCache.get('/static/app/main/bazaar/home/directives/gem-card-md/gem-card-md.html'));
    mockGem = {
      "id": "ZZZ",
      "categories": [
          {
              "id": "3D Models"
          },
          {
              "id": "3D Models_Characters"
          }
      ],
      "main_picture": {
          "image": "IMAGE",
          "id": "XXX"
      },
      "title": "TITLE",
      "description": "DESCRIPTION",
      "rating": "3.00",
      "vendor": "VENDOR"
    }
  }));

  it('should accept a gem data object, and add the card class to the element afterwards', function() {
    scope.gem = mockGem;
    console.log($compile(elm)(scope));
    console.log(elm);
  });



});
