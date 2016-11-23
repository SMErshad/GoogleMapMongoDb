myApp
    .directive('starRating', [function () {
    var directive = {
        restrict: 'EA',
        template:
          '<ul class="star-rating" ng-class="{readonly: readonly}">' +
          '  <li ng-repeat="star in stars track by $index" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
          '    <i class="fa fa-star"></i>' + // or &#9733
          '  </li>' +
          '</ul>',
        //scope: true,
        require: 'ngModel',
        link: link,
        scope: {
            ratingValue: '=',
            max: '=', // optional (default is 5)
            onRatingSelect: '=',
            readonly: '='
            
        }
    };

    return directive;
    function link(scope, element, attributes) {
        if (scope.max == undefined) {
            scope.max = 5;
        }
        function updateStars() {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        };
        scope.toggle = function(index) {
            if (scope.readonly == undefined || scope.readonly === false){
                scope.ratingValue = index + 1;
                scope.onRatingSelect({
                    rating: index + 1
                });
            }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
            if (newValue) {
                updateStars();
            }
        });
    }
    
    }]);