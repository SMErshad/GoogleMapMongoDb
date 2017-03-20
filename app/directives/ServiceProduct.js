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
                        
                        var template = angular.element(html);
                        // Append it to the directive element
                        element.append(template);
                        scope.$eval(scope.panelVal[i] = scope.panelValue[i]);
                        scope.$eval(scope.service);
                        var panelval = scope.panelValue[i];
                        //scope.panelVal[i] = panelval;
                        var x = scope.panelVal[i];
                        //scope.service = scope.panelService[i];
                        var rateYoDemo = 0;
                        
                        
                        $rootScope.serveEdit = scope.service.Name;
                        scope.serveEditEach = scope.service.Name;
                        var name = null;
                        name = scope.service.Name;
                        //scope.i = i;
               
                        //$("#service-details").append('<strong>Service/Product:</strong> ' + scope.service.Name + '<br>' + '<i class="fa fa-commenting"></i> ' + scope.service.serviceComments + '</br></br>');
                        scope.serviceDetails = '<i class="fa fa-commenting"></i> ' + scope.service.serviceComments + '</br></br>';


                        if (typeof scope.service.serviceRating !== 'undefined' && scope.service.serviceRating !== null) {
                            rateYoDemo = scope.service.serviceRating.pop();
                        }
                        else if (typeof scope.service.serviceRating == 'undefined') {
                            rateYoDemo = 0;
                        }

                        i++;
                        //scope.i = i;
                        $rootScope.i = i;
                        
                        scope.$watch(function () {
                            $("#rateYoDemoService" + name).rateYo({
                                rating: rateYoDemo,
                                starWidth: "25px",
                                ratedFill: "#f0ad4e",
                                precision: 2,
                                onSet: function (rating, rateYoInstance) {
                                    
                                    scope.rateYoDemoService = rating;
                                    },
                                 onInit: function (rating, rateYoInstance) {
                                     scope.rateYoDemoServiceInit = rating;
                                    console.log("RateYo initialized! with " + rating);
                                     }
                                })
                        },
                        function (newValue, oldValue, scope) {
                            //$("#rateYoDemoService" + name).rateYo({ rating:newValue });
                        }); 

                       
                        
                        $compile(template)(scope);

                       
                        
                    });

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
