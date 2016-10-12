myApp
.controller('myController', ['$scope', '$compile', 'dataFactory', '$http', '$rootScope', '$element','$q', '$uibModal',
function ($scope, $compile, dataFactory, $http, $rootScope, $element, $q, $uibModal) {

    var company = $rootScope.company;
    var place = $rootScope.place;
    var h = $(window).height();
    $scope.winHeighthalf = h / 4;

    //$scope.entities = [];
    //$scope.searchMap;

    var self = this;

    $scope.animateElementIn = function ($el) {
        $el.removeClass('hidden');
        $el.addClass('animated ' + 'fadeInDown');
    };

    $scope.animateElementOut = function ($el) {
        $el.addClass('hidden');
        $el.removeClass('animated ' + 'fadeInDown');
    };


    ///********modal directive starts here*********************//
    //$scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            template: '<div modal-directive class="col-md-12" style="height:450px"></div>',
            $scope:true,
            controller: 'ModalInstanceCtrl',
            
            size: size,
            resolve: {
                //items: function () {
                //    return $scope.items;
                //}
            }
        });

        modalInstance.result.then(function () {
            //$scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };



    $scope.openServiceModal = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            template: '<div modal-service class="col-sm-6" style="height:450px"></div>',
            $scope: true,
            controller: 'ModalInstanceCtrl1',

            size: size,
            resolve: {
                //items: function () {
                //    return $scope.items;
                //}
            }
        });

        modalInstance.result.then(function () {
            //$scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };




    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

            ///********modal directive ends here*********************//
    $scope.modalPosition = function () {
        var left = angular.element('#pac-input').prop(offsetLeft);
        var top = angular.element('#pac-input').prop(offsetTop);
        var modalTop = top + angular.element('#pac-input').height() + 5;
        $('#modalpanel').offset({top: top, left: modalTop});
    };



            var localSearch = function (query) {
                //var deferred = $q.defer();
                //var promise = deferred.promise;

                Object.prototype.isNullOrEmpty = function (value) {
                    return (!value);
                }

                
                    
                        //var query = result;
                        dataFactory.searchLocal(query)
                         .then(function (data, status, headers, config, statusText) {
                             //data = $.parseJSON(data);
                           if (data.data[0] != null && data.data[1] != null)
                             var responseData = angular.fromJson(data.data); 
                             
                               if (responseData[0] == null && responseData[1] == null) {
                             
                                     $scope.open('lg');
                                     
                             }
                             else {
                                 console.log(data.data);
                                 $scope.entities = [];
                                     angular.forEach(responseData, function (item) {
                                         item = angular.fromJson(item);
                                         $scope.entities.push(item);

                                         console.log(item);
                                     });
                                 
                                 //angular.element("#localFound").html($scope.entities);
                             }
                         });
                    
                    
                
            };
            //$scope.searchMap = angular.element("#pac-input").attr("ng-model");

            //angular.element("#pac-input").bind('blur', function (event) {
            //    //event.preventDefault();
            //    var query = document.getElementById("pac-input").value.toString();
            //    localSearch(query);
            //    //console.log($scope.entities);
            //});

            








            self.start = function () {

                //$("#map").on("load", function () {
                //    angular.element("#follow").show();
                //});
                //if ($("#map").is(":visible") == true) {
                //    angular.element("#follow").show();
                //}

                angular.element("#addServiceButton").show();

                var company = $rootScope.company;
                var place = $rootScope.place;
                var placeID = place.place_id;
                var userComment = '';

                $('#md-user-input').html("");
                $("#md-comments").html("");

                $('#md-user-input').prepend('<div class="row"  style="text-align:center"><div id="jRateFinal" class="jRate col-md-6"></div></div><div id="iw-container"  style="text-align:center" class=""><strong>' + place.name + '</strong><br>' +
                                              'Place ID: ' + place.place_id + '<br>' + place.formatted_address + '<br><br>');

                $(".jRate").jRate({
                    startColor: 'green',
                    endColor: 'green',
                    rating: place.rating,
                    onSet: function (score) {
                        jRateScore = score;
                        if (place.rating == null)
                            userRating = parseFloat(jRateScore);
                        else
                            userRating = parseFloat((parseFloat(jRateScore) + parseFloat(place.rating)) / 2);
                        //alert(score);
                        //var deferred = $q.defer();
                        //var promise = deferred.promise();
                        angular.element('#jRateFinal').on('click', function () {
                            $scope.formComment = [];
                            //$scope.myHtml = '<div id="block" style="height:120px;" >Would you like to put a comment as well?<br><textarea id="addComment"></textarea><br><button ng-model="submitComment" ng-click="addUserComment()" id="submitComment" value="">Add a Comment</button></div>';
                            //$scope.formComment.push($scope.myHtml);
                            var newUserFormAnimatedDirective = angular.element('<div class="row" ng-controller="myController" style="height:100%;"><div id="companyUserComment" when-visible="animateElementIn" class="row car-container" style="height:100%"><div class="row car panel-body"><div class="row" id="block" ng-controller="myController"><div class="row"><div class="col-md-2"></div><div class="col-md-8"><i class="fa fa-pencil-square-o" aria-hidden="true" style="color:green"></i>&nbsp;&nbsp;Would you like to put a comment as well?&nbsp;&nbsp;<i class="fa fa-pencil-square-o" aria-hidden="true" style="color:green"></i></div><div class="col-md-2"></div></div><div class="row"><form class="col-md-8" name="companyCommentForm" ng-controller="myController" ng-submit="addUserComment()" style="margin-left:138px"><textarea class="col-md-12" ng-model="companyComment" form="companyCommentForm" style="background-color:white;padding-left:100px;border:0px;border-radius:2px;" rows="3"></textarea><input  style="background-color:#c9e1c9;border:0px;color:black" class=" btn btn-success form-control btn-block" type="submit" value="Add" /></form></div></div></div></div></div>');
                            var element = $compile(newUserFormAnimatedDirective)($scope);
                            angular.element("#md-form-input").append(element);
                        });

                        $.ajax({
                            type: "POST",
                            url: "../Home/UserRatingSave",
                            data: { PlaceID: placeID, UserRating: userRating, Company: company },
                            dataType: "json",
                            traditional: true,

                            success: function (dataa) {
                                dataa = $.parseJSON(dataa);
                                var responseRating = dataa.Rating;
                                console.log(responseRating);

                                document.getElementById('jRateFinal').innerHTML = "<br>";

                                //if (responseRating == NaN) {
                                $(".jRate").jRate({
                                    startColor: 'green',
                                    endColor: 'green',
                                    rating: responseRating,
                                    readonly: true
                                });



                            }
                        });

                    }
                });


                console.log("Fun times have been started!");

                if (company != null && place != null) {

                    dataFactory.googleComments(place.place_id)
                           .then(function (data) {
                               console.log(data);
                               result = $.parseJSON(data.data).result;
                               reviews = result.reviews;
                               var CommentsArray = [];
                               var htmlBoth = "";
                               $scope.googleComments = [];

                               //htmlBoth += "<div>";
                               if (reviews != undefined) {
                                   $.each(reviews, function (index, item) {
                                       console.log("GoogleComment[" + index + "]: " + item.text);
                                       $scope.googleComments.push(item.text);



                                       //htmlBoth += "GoogleComment[" + index + "]: " + item.text + "<br>";
                                       CommentsArray.push(item.text);
                                   });
                                   //var x = $("#mdCommentsAnimated");
                                   //angular.forEach($scope.googleComments, function (item, index) {
                                   var newAnimatedDirective = angular.element('<div ng-repeat="car in googleComments" bind-scroll-to=".animatedDiv" when-visible="animateElementIn" class="car-container"><div class="car panel-body" id="commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
                                   var element = $("#animatedDiv").prepend(newAnimatedDirective);
                                   $compile(newAnimatedDirective)($scope);
                                   //});





                                   company.Comments = new Array();
                                   for (var i = 0; i < CommentsArray.length; i++) {
                                       company.Comments.push(CommentsArray[i]);
                                   };


                                   //$("#md-comments").html(htmlBoth);
                               }

                           })
                        .then(function () {
                            dataFactory.savePlace(company)
                                       .then(function (response) {
                                           console.log(response);
                                           var result = $.parseJSON(response.data);
                                           var reviews = result.Comments;
                                           var ourReviews = result.UsersComments;
                                           //userComment = dataa.userComment;
                                           //htmlBoth += "<br><strong>Recent Comment: " + userComment + "</strong><br>";


                                           console.log(reviews);
                                           console.log(ourReviews);
                                           console.log(response);
                                           //result = $.parseJSON(response);

                                           //userComment = response.userComment;
                                           //htmlBoth += "<br><strong>Recent Comment: " + userComment + "</strong><br>";
                                           $scope.ourComments = [];

                                           if (ourReviews.length > 0) {
                                               $.each(ourReviews, function (index, item) {
                                                   console.log("OurComment[" + index + "]: " + item);
                                                   $scope.ourComments.push(item);
                                                   //CommentsArray.push(item);
                                                   htmlBoth += "<br><strong>OurComment[" + index + "]:</strong> " + item + "<br>";

                                               });
                                           }

                                           $scope.ourComments.reverse();

                                           if ($scope.ourComments.length > 0) {

                                               var newOurCommentAnimatedDirective = angular.element('<div ng-repeat="car in ourComments" bind-scroll-to=".animatedDiv" when-visible="animateElementIn"   class="car-container"><div class="car panel-body" id="commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
                                               var element = $("#animatedDiv").prepend(newOurCommentAnimatedDirective);
                                               $compile(newOurCommentAnimatedDirective)($scope);

                                           }

                                           htmlBoth += "</br>";
                                           //var htmlOur = "<br>";

                                           //$("#md-comments").append(htmlBoth);
                                           var services = result.Services;

                                           //$scope.services = services;
                                           $scope.panelValue = [];  
                                           $scope.panelService = [];
                                           $rootScope.i = 0;
                                           if (services.length > 0) {
                                               angular.forEach(services, function (service, key) {

                                                   $scope.panelValue.push(key);
                                                   $scope.panelService.push(service);
                                                   //$scope.panelVal = key;
                                                   //$scope.service = service;

                                                   var newDirective = angular.element('<div class="row"><div service-product class="col-md-12" ng-controller="myController" style="float:left;"></div></div>');
                                                   var element = $("#serviceCollection").append(newDirective);


                                                   $compile(newDirective)($scope);
                                                   //($rootScope.i)++;
                                                   //$scope.i += 1;


                                               });
                                           }

                                       })
                        }),

                        function (error) {
                            $scope.status = 'Unable to load place data: ' + error.message;
                        };
                }
            };


            $scope.addUserComment = function () {
                var place = $rootScope.place;
                //$scope.userComment = [];
                placeID = place.place_id;
                var userComment = $scope.companyComment;
                angular.element("#md-form-input").hide();


                //$scope.userComment.push($("#addComment").val());

                //var newUserCommentAnimatedDirective = angular.element('<div  ng-controller="myController" style="height:100%;"  id="mdCommentsAnimated"><div ng-repeat="car in userComment" bind-scroll-to=".animatedDiv" when-visible="animateElementIn"   class="car-container" style="height:180px;"><div class="car panel-body" id="commentPublish" style="height:150px;"><i class="fa fa-quote-left" style="color:green"></i>{{car}}<i class="fa fa-quote-right" style="color:green"></i></div></div></div>');
                //var element = $("#animatedDiv").prepend(newUserCommentAnimatedDirective);
                //$compile(newUserCommentAnimatedDirective)($scope);
                //var userComment = $scope.userComment;

                $.ajax({
                    type: "POST",
                    url: "../Home/UserCommentSave",
                    data: { PlaceID: placeID, UserComment: userComment },
                    dataType: "json",

                    success: function (dataa) {
                        //$("#md-form-input").hide();
                        console.log(dataa);
                        dataa = $.parseJSON(dataa);
                        ourReviews = dataa.UsersComments;
                        $scope.ourComments.reverse();
                        //$scope.ourComments.push;


                        $scope.ourComments.push(review);

                        $scope.ourComments.reverse();
                        var arr = [];

                        angular.forEach($scope.ourComments, function (comment) {
                            if (comment === $scope.ourComments[0])
                                arr.push(comment);

                        });

                        var ourCommentsAnimatedDirective = angular.element('<div ng-controller="myController" style="height:100%;"><div ng-repeat="car in arr" bind-scroll-to=".animatedDiv" when-visible="animateElementIn"    class="car-container" style="height:120px;"><div class="car panel-body" style="height:100px;"><i class="fa fa-quote-left" style="color:green"></i>{{car}}<i class="fa fa-quote-right" style="color:green"></i></div></div></div>');
                        var element = $("#animatedDiv").prepend(ourCommentsAnimatedDirective);
                        $compile(ourCommentsAnimatedDirective)($scope);

                        //angular.element("#animatedDiv").prepend(ourReviews);
                        console.log(ourReviews);



                    }
                });
            };




            $scope.serveComments = function () {
                $("#jRateFinal").hide();
                $("#md-user-input").hide();
                var serveName = $rootScope.serveEdit;

                var company = $rootScope.company;
                var services = company.Services;
                var comms = [];
                angular.forEach(services, function (service, key) {
                    if (service.Name == serveName) {
                        comms.push(service.serviceComments);
                        $scope.comms = comms;

                        $("#animatedDiv").hide();

                        //angular.forEach($scope.comms, function (car, key) {

                            var newAnimatedDirective = angular.element('<div ng-repeat="car in comms" bind-scroll-to=".animatedDiv" when-visible="animateElementIn" class="car-container"><div class="car panel-body" id="commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
                            var element = $("#animatedDivServices").prepend(newAnimatedDirective);
                            $compile(newAnimatedDirective)($scope);

                        //});
                    }
                    
                });


            };


            $scope.openFormOld = function () {

                //$("#formOld" + $scope.panelVal).show();
                $scope.openServiceModal('lg');
                $("#userService" + $scope.panelVal).hide();
            };

            $scope.submitFormOld = function () {
               //ok();
                //$("#formOld" + $scope.panelVal).hide();
                $("#userService" + $scope.panelVal).show();

                var sum = 0;


                var company = $rootScope.company;

                var PlaceID = company.PlaceId;

                var reviews = [];
                var CommentsArray = [];
                var Rating = parseFloat(company.Rating);
                var userRating = '';
                //alert(score);

                var Name = company.Name;
                //var Address = company.formatted_address;
                //angular.forEach(company.services,function(service,key){
                //        if(service.Name ==   ){
                //        }
                //});

                //var serviceComments = company.Services;

                //push($scope.userComment);

                var Product = function Product() {
                    this.Id = 1;
                    this.Name = "KFC";
                    this.Rating = 4.3;
                    this.Comments = ["hgtyftyfyft", "hgddjfghgf"];
                };

                var Product = new Product();
                var Products = [];
                Products.push(Product);

                var Services = company.Services;
                var ser = null;
                
                angular.forEach(Services, function (service, key) {
                    
                    if(service.Name == $scope.service.Name)
                    {
                        //angular.forEach(service.serviceRating, function (eachRate, key1) {
                        //    sum = sum + eachRate;
                        //});

                        //sum = sum/service.serviceRating.length;
                        ser = service;
                                              
                        
                    }
                    //Services.push(service);

                });
                sum = ser.serviceRating[0];
                sum = (sum + $scope.last_value_user) / 2;
                ser.serviceRating = [];
                ser.serviceRating.push(sum);
                ser.serviceComments.push($scope.userCommentOld);
                //Services.push(ser);

                
                //var Service = function Service() {
                //    //this.Id = 1;
                //    //this.Name = "KFC";
                //    this.Type = "Food";
                //    this.Description = "Burger";
                //    this.serviceRating = [];
                //    this.serviceComments = [];
                //    this.Name = $scope.serviceName;
                //    //this.serviceRating = company.Services;
                //    this.serviceRating.push($scope.last_value_one);
                //    this.serviceComments.push($scope.userCommentOld);
                //};

                //var Service = new Service();
                //var Services = company.Services;
                //Services.push(Service);

                company = {
                    "PlaceId": PlaceID, "Name": Name, "Rating": Rating, "Comments": ["", "", "", "", ""], "UsersComments": [5], "Department": null, "Products": Products, "Services": Services
                };

                $rootScope.company = company;

                if (company != null) {
                    dataFactory.updateServiceProduct(company)
                        .then(function (data) {
                            //$scope.places = data;
                            console.log(data);
                            data = $.parseJSON(data.data);
                           var services = data.Services;

                            $scope.services = data.Services;
                            //$scope.Rating = $scope.services.serviceRating;

                            var keyIterate = 0;
                            var serviceIterateUpdate = '';
                            //serviceIterate = services[length - 1];

                            //$scope.panelValue.length = 0;
                            //$scope.panelService.length = 0;
                            //var panelVal = Math.max($scope.panelValue);
                            //var keepGoing = true;
                            angular.forEach(services, function (service, key) {
                              //  if (keepGoing) {
                                if (service.Name == $scope.service.Name) {
                                    //keyIterate = key;
                                    serviceIterateUpdate = service;
                                    
                                }

                             });

                                        //$scope.service = serviceIterate;
                                        //$rootScope.i = 0;
                                        //var panelIterator = 

                                        $scope.panelValue.push($rootScope.i);
                                        //$scope.panelVal = $scope.panelValue[$rootScope.i];
                                        $scope.panelService.push(serviceIterateUpdate);
                                        //$scope.Rating = serviceIterate.serviceRating;

                                        //$scope.serviceDetails = '<strong>Service/Product:</strong> ' + $scope.service.Name + '<br>' + '<i class="fa fa-commenting"></i> ' + $scope.service.serviceComments + '</br></br>';

                                        //var starDirective = angular.element('<input-stars max="5" class="col-md-12" icon-full="fa-star" icon-base="fa fa-fw" icon-empty="fa-star-o" ng-model="Rating" ></input-stars>');

                                        //angular.element("#serviceRating" + $rootScope.i).html();
                                        //var updatedValue = angular.element("#serviceRating" + $rootScope.i).append(starDirective);
                                       
                                        angular.element(document.querySelector("#commentPublishPanelDiv" + $scope.panelVal)).parent().parent().remove();
                                       
                                        var newDirective2 = angular.element('<div class="row"><div service-product ng-controller="myController" class="col-md-12" style="height:200px;float:left;"></div></div>');
                                        
                                        var element = $("#serviceCollection").prepend(newDirective2);
                                       // $compile(newDirective2)($scope);
                                        $compile(newDirective2)($scope);
                                        //$apply(newDirective)($scope);
                                       // keepGoing = false;
                                        //forEach.break;
                                   // }
                                //}
                            
                            
                           
                        }),
                    function (error) {
                        //$scope.status = 'Unable to load place data: ' + error.message;
                    };

                }
            };





            $scope.submitOne = function () {
                //$("#userFormPanel").hide();
                var company = $rootScope.company;
                angular.element("#serviceForm").hide();

                //$rootScope.i++;

                var PlaceID = company.PlaceId;

                var reviews = [];
                var CommentsArray = [];
                var Rating = parseFloat(company.Rating);
                var userRating = '';
                //alert(score);

                var Name = company.Name;
                var Address = company.formatted_address;
                

                //var serviceComments = company.Services;

                //serviceComments.push($scope.userComment);

                var Product = function Product() {
                    this.Id = 1;
                    this.Name = "KFC";
                    this.Rating = 4.3;
                    this.Comments = ["hgtyftyfyft", "hgddjfghgf"];
                };
                var Product = new Product();
                var Products = [];
                Products.push(Product);

                var Service = function Service() {
                    //this.Id = 1;
                    //this.Name = "KFC";
                    this.Type = "";
                    this.Description = "";
                    //this.serviceRating = [];
                    this.serviceComments = [];
                    this.Name = $scope.serviceName;
                    this.serviceRating = [];
                    //this.serviceRating = company.Services;
                    this.serviceRating.push($scope.last_value);
                    this.serviceComments.push($scope.userComment);
                };

                var Service = new Service();
                var Services = company.Services;
                Services.push(Service);

                company = {
                    "PlaceId": PlaceID, "Name": Name, "Rating": Rating, "Comments": ["", "", "", "", ""], "UsersComments": [5], "Department": null, "Products": Products, "Services": Services
                };

                $rootScope.company = company;



                if (company != null) {
                    dataFactory.serviceProduct(company)
                        .then(function (data) {
                            //$scope.places = data;
                            console.log(data);
                            data = $.parseJSON(data.data);
                            var services = data.Services;

                            $scope.services = services;
                            var keyIterate = 0;
                            var serviceIterateNew = '';

                            //$scope.panelValue.length = 0;
                            //$scope.panelService.length = 0;
                            //var panelVal = Math.max($scope.panelValue);

                            angular.forEach(services, function (service, key) {

                                
                                    keyIterate = key;
                                    serviceIterateNew = service;
                                

                            });

                            //$rootScope.i = 0;
                            //var panelIterator = 
                            //serviceIterate = services[length - 1];

                            $scope.panelValue.push($rootScope.i);
                            //$scope.panelVal = $scope.panelValue[$rootScope.i];
                            $scope.panelService.push(serviceIterateNew);
                            var newDirective = angular.element('<div class="row"><div service-product ng-controller="myController" class="col-md-12" style="height:200px;float:left;"></div></div>');
                            var element = $("#serviceCollection").prepend(newDirective);
                            $compile(newDirective)($scope);


                        }),
                    function (error) {
                        //$scope.status = 'Unable to load place data: ' + error.message;
                    };

                }
            };

            $scope.serviceAdding = function () {
                angular.element("#serviceForm").show();
                //angular.element("#incept").;
            };

            //var element = document.querySelector('[ng-form]');
            $scope.submitSearch = function (query) {
                //alert("ghfghfhfghfjfgfdfjghghf");
                localSearch(query);
            };
            
            $scope.userCreatedSubmit = function () {
                
                    var formElements = angular.element();
                    //company.push(formElements);
                    
                    var companyName = $scope.newCompanyName;
                    //company.Name = companyName;
                    var companyRating = $scope.userCreatedValue;
                    //company.Rating = companyRating;
                    var companyComment = $scope.userCreatedComment;
                   
                    var company = {
                        "PlaceId": null, "Name": companyName, "Rating": companyRating, "Comments": ["", "", "", "", ""], "UsersComments": [5], "Department": null, "Product": null, "Services": null
                    };
                    company.Comments.push(companyComment);

                    dataFactory.userCreatedCompany(company)
                        .then(function (data) {
                            //$scope.places = data;
                            console.log(data);
                            data = $.parseJSON(data.data);
                            ////services = data.Services;

                            $scope.newCompany = data;
                            angular.element('#newCompany').html($scope.newCompany);
                           
                        }),
                    function (error) {
                        //$scope.status = 'Unable to load place data: ' + error.message;
                    };
                };
           
        }
    
            
     ]);




    