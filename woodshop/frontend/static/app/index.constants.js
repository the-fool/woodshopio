(function ()
{
    'use strict';

    angular
        .module('woodshop')
        .constant({
          "CATEGORIES":
          [
            ["3D Models", [
              ["Characters", [["Human", [["Fantasy", ""], ["Sci-fi", ""], ["Miltary", ""], ["Other", ""]]],
              ["Animal", [["Land", ""], ["Sea", ""], ["Other", ""]]], ["Robot", ""], ["Other", ""]]],
              ["Vehicles", [["Air", ""], ["Land", ""], ["Space", ""], ["Other", ""]]]
              ]
            ],
            ["Shaders", [
              ["Landscape", ""], ["Camera FX", ""], ["Other", ""]]
            ],
          ]
        });
})();
