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
                        var x = 0;

                        timer = $timeout(function () {
                            var y = scope.searchMap;

                            if (tmpStr === scope.searchMap) {
                                if ((angular.element(document.getElementsByClassName('pac-container')).css('display') == 'none' && $rootScope.flag1 == false) || ($rootScope.infowindow && $rootScope.marker && $rootScope.flag1 == false)) {
                                    scope.submitSearch(scope.searchMap);
                                }
                                else {
                                    if (tmpStr.length > 0) {
                                    element
                                        .focus(function () { $(this).select(); } )
                                        .mouseup(function (e) {e.preventDefault(); });
                                        //x = tmpStr.substring(0, (tmpStr.length - y.length + 1) );
                                       x = scope.searchMap;
                                        
                                    }
                                        //x = tmpStr;
                                        //scope.searchMap = x;

                                    //scope.placeName = '';
                                    
                                    scope.initMap();
                                    
                                        
                                    
                                    
                                }
                            }
                        }, 1000);
                    }, true);
                
                });
             }
    }
    
});