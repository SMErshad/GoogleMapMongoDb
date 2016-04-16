myApp
    .directive('modalDirective', ['$rootScope', '$compile', '$templateRequest','$q', function ($rootScope, $compile, $templateRequest, $q) {
        // directive link function

        var link = function ($scope, $element, $attrs, myController, $transclude) {

            //var i = 0;

            //angular.forEach(scope.panelService, function (service, k) {
            $templateRequest('../modalDirective.html').then(function (html) {

                var template = angular.element(html);
                // Append it to the directive element

                //var innerTemplate = angular.element(html).find('new-entry');
                //$compile(innerTemplate)(scope);

                //$scope.$apply(function () {
                //var deferred = $q.defer();
                //if (template) {
                //    deferred.resolve(template);
                //} else {
                //    deferred.reject("Wait, there are something wrong with the directive.");
                //};

                //var promise = deferred.promise;

                //promise.then(function (template) {
                //    $scope.$watch($element, function (val) {
                //        $scope.$eval(val);
                //    });
                    $element.append(template);
                    $scope.$eval($attrs.modalDirective);
                    
                    $compile(template)($scope);
                //}, function (reason) {
                //    $element.text("Fail (" + reason + ")");
                //    console.log("Failed promise.");

                //});

                //    var container = angular.element('<div class="container"></div>');


                //    var instance = $transclude($scope.$new(),
                //    function (clonedElement, newScope) {
                //        clonedElement = $compile(template)(newScope);
                //    });
                //    // Add it to our container
                //    container.append(instance);

                //    $element.after(container);
                //});




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
            //replace: true,
            //transclude: true,
            controller: 'myController',
            link: link
        };
    }]);