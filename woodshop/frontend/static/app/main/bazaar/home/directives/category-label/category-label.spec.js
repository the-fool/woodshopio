describe('categoryLabel directive', function()
{
  var $compile
    , $rootScope
    , scope
    , elm
    , mockCats = [{id: 'Cat1'}, {id: 'Cat1_Cat2'}]
    ;
  beforeEach(module('app.bazaar.home'));
  beforeEach(inject(function(_$compile_, _$rootScope_)
  {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    elm = angular.element("<category-label categories='categories'></category-label>");
  }));

  it('should throw if not passed some data', function () {
    expect(function()
    {
      $compile(elm)($rootScope);
    })
    .toThrow();
  });


  it('should accept an array of two or one categories', function() {
    scope.categories = [{id: 'Cat1'}];
    expect(function()
    {
      $compile(elm)(scope);
    })
      .not
      .toThrow();

    scope.categories = [{id: 'Cat1'}, {id: 'Cat2'}];
    expect(function()
    {
      $compile(elm)(scope);
    })
      .not
      .toThrow();
  });

  it('should render its category data into anchor tags with links', function() {
    var mockCats = [{id: 'Cat1'}, {id: 'Cat1_Cat2'}];
    scope.categories = mockCats;
    $compile(elm)(scope);

    var anchors = elm.find('a');
    expect(anchors.length).toBe(2);

    expect(angular.element(anchors[0]).attr('ui-sref'))
      .toEqual("app.bazaar-filtered({category: 'Cat1', subCategory: ''})"
    );

    expect(angular.element(anchors[1]).attr('ui-sref'))
      .toEqual("app.bazaar-filtered({category: 'Cat1',"
                + " subCategory: 'Cat2'})"
    );

  });

});
