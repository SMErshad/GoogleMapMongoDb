/// <reference path="../../../accord.html" />
myApp
    .directive('serviceProduct', ['$rootScope','$compile','$templateRequest', function ($rootScope, $compile, $templateRequest) {
        // directive link function
        
        var link = function(scope, element, attrs, myController) {

                //var i = 0;

                //angular.forEach(scope.panelService, function (service, k) {
                    $templateRequest('../accord.html').then(function (html) {
                        // Convert the html to an actual DOM node
                        var i = $rootScope.i;

                        scope.panelVal = scope.panelValue[i];
                        var service = scope.panelService[i];
                        var template = angular.element(html);
                        // Append it to the directive element
                        element.append(template);

                        i++;
                        //scope.i = i;
                        $rootScope.i = i;
                        //scope.i = i;
               
                        //$("#service-details").append('<strong>Service/Product:</strong> ' + scope.service.Name + '<br>' + '<i class="fa fa-commenting"></i> ' + scope.service.serviceComments + '</br></br>');
                        scope.serviceDetails = '<strong>Service/Product:</strong> ' + service.Name + '<br>' + '<i class="fa fa-commenting"></i> ' + service.serviceComments + '</br></br>';
               
                        scope.last_value = service.serviceRating;
                        var starDirective = angular.element('<input-stars max="5" class="col-md-12" icon-full="fa-star" icon-base="fa fa-fw" icon-empty="fa-star-o" ng-model="last_value" ></input-stars>');
                        $(".serviceRating").append(starDirective);
                        //var stars = '<input-stars max="5" class="col-md-12" icon-full="fa-star" icon-base="fa fa-fw" icon-empty="fa-star-o" ng-model="scope.last_value"></input-stars>';
                        
                        //var stars = $compile(starDirective)(scope);
                        //scope.serviceRating = stars;
                        //console.log(scope.last_value);
                        // And let Angular $compile it
                        
                        $compile(template)(scope);
                    });

                    //i = 0;
            //});
            
        }        

        return {
            restrict: 'EAC',
            scope: true,
            //require: '^^ngModel',
            //template: '<div class="col-md-6"><div class="panel panel-success"><div class="panel-heading" role="tab" id="headingOne"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Service/Product Title</a></h4></div><div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne"><div class="panel-body" id="commentPublish"><p class="col-md-5 service-details"></p><span class="col-md-7 serviceRating" ng-model="serviceRating" style="float:right;"></span></div></div></div></div>',
            //template: '<ng-include src="getTemplate()"></ng-include>',
            template:'' ,
            //replace: true,
            //transclude: true,
            controller: 'myController',
            link: link
        };
    }]);
