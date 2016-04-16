myApp.directive('ngEnter', function ($timeout, $rootScope) {
    return {
        restrict: 'A',
        scope: true,
        //require: 'ngModel',

        link: function (scope, element, attrs) {
            var timer = null;

            element.bind("keyup", function (event) {
               
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                    scope.$eval(attrs.ngModel);
                });

                if (timer)
                    $timeout.cancel(timer);
               
                    scope.$watch('searchMap', function (tmpStr) {

                        if (!tmpStr || tmpStr.length == 0)
                            return 0;

                        timer = $timeout(function () {

                            if (tmpStr === scope.searchMap) {
                                if ((angular.element(document.getElementsByClassName('pac-container')).css('display') == 'none' && $rootScope.flag1 == false) || $rootScope.infowindow) {
                                    scope.submitSearch(scope.searchMap);
                                }                                
                            }
                        }, 3000);
                    }, true);
                
                });
             }
    }
    
});