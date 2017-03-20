myApp
    .directive('modalService', ['$rootScope', '$compile', '$templateRequest', '$q', function ($rootScope, $compile, $templateRequest, $q) {
        // directive link function

        var link = function ($scope, $element, $attrs, controller, $transclude) {

            //var i = 0;

            //angular.forEach(scope.panelService, function (service, k) {
            $templateRequest('../modalService.html').then(function (html) {

                //var template = angular.element(html);
                //var i = $rootScope.i;
                var company = $rootScope.company;
                $scope.services = company.Services;
                //$scope.service = $scope.services[$scope.serviceIndex];
                //$scope.panelVal = $scope.panelValue[i];
                //$scope.service = $scope.panelService[i];
                var template = angular.element(html);
                // Append it to the directive element
                //element.append(template);

                //i++;
                ////scope.i = i;
                //$rootScope.i = i;

                $element.append(template);
                $scope.$eval($attrs.modalService);
                $scope.$eval($attrs.inputStars);
                $compile(template)($scope);
                //$scope.$watch(function () {
                //    $('#rateYoDemo').rateYo({
                //        rating: $scope.rateYoDemoServiceInit,
                //        starWidth: "25px",
                //        ratedFill: "#f0ad4e",
                //        precision: 2,
                //        onSet: function (rating, rateYoInstance) {

                //            $scope.rateYoDemo = rating;
                //        },
                //        onInit: function (rating, rateYoInstance) {
                //            $scope.rateYoDemoInit = rating;
                //            console.log("RateYo initialized! with " + rating);
                //        }
                //    });
                //},
                //        function (newValue, oldValue, scope) {
                //            //$("#rateYoDemoService" + name).rateYo({ rating:newValue });
                //        });
                //scope.$watch(function () {
                //            $("#rateYoDemoService" + name).rateYo({
                //                rating: rateYoDemo,
                //                starWidth: "25px",
                //                ratedFill: "#f0ad4e",
                //                precision: 2,
                //                onSet: function (rating, rateYoInstance) {
                                    
                //                    scope.rateYoDemoService = rating;
                //                    },
                //                 onInit: function (rating, rateYoInstance) {
                //                     scope.rateYoDemoServiceInit = rating;
                //                    console.log("RateYo initialized! with " + rating);
                //                     }
                //                })
                //        },
                //        function (newValue, oldValue, scope) {
                //            //$("#rateYoDemoService" + name).rateYo({ rating:newValue });
                //        });

                //$scope.$watch(function () {
                //    return $scope.last_value_user_modal;
                //}, function (value) {
                //    console.log(value);
                //});

          
                //$scope.$apply(function () {
                //$scope.searchMap = angular.element('#pac-input').val();
                
                
               
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