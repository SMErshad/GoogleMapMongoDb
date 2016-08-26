myApp
    .directive('newEntry', ['$rootScope', '$compile', '$templateRequest', function ($rootScope, $compile, $templateRequest) {
        // directive link function

        var link = function ($scope, $element, $attrs, myController) {

            //var i = 0;

            //angular.forEach(scope.panelService, function (service, k) {
            $templateRequest('../newEntry.html').then(function (html) {

                var offset = angular.element('#pac-input').offset();
                var left = offset.left;
                var top = offset.top;
                var modalTop = top + angular.element('#pac-input').height() + 5;
                angular.element($element.children()[1]).offset({ top: top, left: modalTop });
                //angular.element('#modalpanel').offset({ top: top, left: modalTop });
                var template = angular.element(html);
                // Append it to the directive element
                $scope.$eval($attrs.newEntry);
                //$scope.$eval(searchMap);
                //$scope.$apply(function () {
                $scope.searchMap = angular.element('#pac-input').val();
                
                    //$scope.$eval($scope.searchMap);
                //});
                //$scope.input = $scope.searchMap;
                //$scope.$watch('searchMap', function (tmpStr) {
                //    $scope.searchMap = tmpStr;
                //});

                $element.append(template); 

                //$scope.$apply(function () {
                   
                    $compile(template)($scope);
                //});
                    //$scope.$watch('searchMap', function (val) {
                    //    $scope.searchMap = val;
                    //});
            });

        };

        return {
            restrict: 'EA',
            $scope: true,
            //require: '^^ngModel',
            //template: '<div class="col-md-6"><div class="panel panel-success"><div class="panel-heading" role="tab" id="headingOne"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Service/Product Title</a></h4></div><div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne"><div class="panel-body" id="commentPublish"><p class="col-md-5 service-details"></p><span class="col-md-7 serviceRating" ng-model="serviceRating" style="float:right;"></span></div></div></div></div>',
            //template: '<ng-include src="getTemplate()"></ng-include>',
            template: '',
            replace: true,
            //transclude: true,
            controller: 'myController',
            link: link
        };
    }]);