myApp
    .directive('modalService', ['$rootScope', '$compile', '$templateRequest', '$q', function ($rootScope, $compile, $templateRequest, $q) {
        // directive link function

        var link = function ($scope, $element, $attrs, myController, $transclude) {

            //var i = 0;

            //angular.forEach(scope.panelService, function (service, k) {
            $templateRequest('../modalService.html').then(function (html) {

                var template = angular.element(html);

                $element.append(template);
                $scope.$eval($attrs.modalService);
                //$scope.$apply(function () {
                //$scope.searchMap = angular.element('#pac-input').val();
                
                $compile(template)($scope);
                
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