myApp
    .directive('modalAddservice', ['$rootScope', '$compile', '$templateRequest', '$q', function ($rootScope, $compile, $templateRequest, $q) {
        // directive link function

        var link = function ($scope, $element, $attrs, controller, $transclude) {

            //var i = 0;

            //angular.forEach(scope.panelService, function (service, k) {
            $templateRequest('../modalAddservice.html').then(function (html) {

                //var template = angular.element(html);
                //var i = $rootScope.i;
                var company = $rootScope.company;
                $scope.services = company.Services;
                //$scope.service = $scope.services[$scope.serviceIndex];
                //$scope.panelVal = $scope.panelValue[i];
                //$scope.service = $scope.panelService[i];
                var template = angular.element(html);
                

                $element.append(template);
                $scope.$eval($attrs.modalAddservice);
                $scope.$eval($attrs.inputStars);
                $compile(template)($scope);

                $('#rateYoDemoBoot').rateYo({
                    rating: 0,
                    starWidth: "25px",
                    ratedFill: "#f0ad4e",
                    precision: 2,
                    onSet: function (rating, rateYoInstance) {

                        $scope.rateYoDemoBoot = rating;
                    }
                });
                



            });
        }

        return {
            restrict: 'EA',
            $scope: true,
            //require: '^^ngModel',
            //template: '<div class="col-md-6"><div class="panel panel-success"><div class="panel-heading" role="tab" id="headingOne"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Service/Product Title</a></h4></div><div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne"><div class="panel-body" id="commentPublish"><p class="col-md-5 service-details"></p><span class="col-md-7 serviceRating" ng-model="serviceRating" style="float:right;"></span></div></div></div></div>',
            //template: '<ng-include src="getTemplate()"></ng-include>',
            template: '',
            //transclude: 'element',
            replace: true,
            //transclude: true,
            controller: 'myController',
            link: link
        };
    }]);