myApp
.controller('myController', ['$scope', '$compile', 'dataFactory', '$http', '$rootScope', '$element','$q', '$uibModal',
function ($scope, $compile, dataFactory, $http, $rootScope, $element, $q, $uibModal) {

    var company = $rootScope.company;
    var place = $rootScope.place;
    $scope.entities = [];


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
            template: '<div modal-directive class="col-md-12" style="height:500px"></div>',
            $scope:true,
            controller: 'ModalInstanceCtrl',
            //    function ($scope, $modalInstance) {
               
            //        $scope.ok = function () {
            //            $modalInstance.close();
            //        };
                
               
            //        $scope.cancel = function () {
            //            $modalInstance.dismiss('cancel');
            //        };
                
            //},

            //    //var el = angular.element.find('new-entry');
            //    //$compile(el)($scope);

            //    $scope.ok = function () {
            //        $modalInstance.close();
            //    };

            //    $scope.cancel = function () {
            //        $modalInstance.dismiss('cancel');
            //    };
            //},
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

    //self.ok = function () {
    //     $modalInstance.close();
    // };

    // self.cancel = function () {
    //      $modalInstance.dismiss('cancel');
    // };

    //modalInstance.result.then(function (selectedItem) {
    //    $scope.selected = selectedItem;
    //}, function () {
    //    //$log.info('Modal dismissed at: ' + new Date());
    //});



            ///********modal directive ends here*********************//




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
                             var container = document.getElementsByClassName('pac-container');
                           
                             //if (!($rootScope.flag1 == true && responseData[0] == null && responseData[1] == null && (angular.element("#pac-input").text() != null)) || !($rootScope.flag1 == false && responseData[0] == null && responseData[1] == null && (angular.element("#pac-input").text() != null) && angular.element('body div .pac-container').css('display') == 'none')) {
                             if (responseData[0] == null && responseData[1] == null) {
                             //var x = 0;
                                     //var deferred = $q.defer();
                                     //if (responseData) {
                                     //    deferred.resolve(responseData);
                                     //} else {
                                     //    deferred.reject("Wait, there are something wrong with the directive.");
                                     //};

                                     //var promise = deferred.promise;

                                     //promise.then(function (template) {
                                     //    x++;
                                     //    if (x == 1) {
                                     //        //alert("ghfghfghf");
                                     //    }
                                     //}, function (reason) {
                                     //    $element.text("Fail (" + reason + ")");
                                     //    console.log("Failed promise.");
                                     //});
                                     //$scope.$watch($element, function (val) {
                                     //    $scope.$eval(val);
                                     //});
                                     //promise.then(function (x) {
                                     //setTimeout(function () {
                                     //$scope.$apply(function () {
                                     $scope.open('lg');
                                     //});
                                     //}, 1000);

                                     //}
                                     //});
                                 
                             }
                             //else {
                             //    console.log(data.data);
                             //    //var response = data.data;
                             //    ////console.log(response);
                             //    //response = angular.fromJson(response);
                             //    //var companyCreate = [];
                             //    //var deferred = $q.defer();
                             //    //var promise = deferred.promise;

                             //    if (responseData[0] != null && responseData[1] != null) {
                             //        angular.forEach(responseData, function (item) {
                             //            item = angular.fromJson(item);
                             //            $scope.entities.push(item);

                             //            console.log(item);
                             //        });
                             //    }
                             //    //angular.element("#localFound").html($scope.entities);
                             //}
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



                var company = $rootScope.company;
                var place = $rootScope.place;
                var placeID = place.place_id;
                var userComment = '';

                $('#md-user-input').html("");
                $("#md-comments").html("");

                $('#md-user-input').prepend('<div id="jRateFinal" style="height:70px;width:350px;" class="jRate"></div><div id="iw-container" class=""><strong>' + place.name + '</strong><br>' +
                                              'Place ID: ' + place.place_id + '<br>' + place.formatted_address + '<br><br>');

                $(".jRate").jRate({
                    startColor: 'black',
                    endColor: 'black',
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
                            var newUserFormAnimatedDirective = angular.element('<div ng-controller="myController" style="height:100%;"><div id="companyUserComment"  when-visible="animateElementIn" class="car-container" style="height:100%"><div class="car panel-body"  style="height:150px;"><div id="block" ng-controller="myController" ><p>Would you like to put a comment as well?</p><br><form name="companyCommentForm" ng-controller="myController" ng-submit="addUserComment()"><p class="form-group"><textarea ng-model="companyComment" form="companyCommentForm" style="width:250px;" class="form-control" rows="3"></textarea></p><br><p class="form-group"><input class="btn btn-success form-control" type="submit" value="Add a comment"/></p></form></div></div></div></div>');
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
                                    startColor: 'black',
                                    endColor: 'black',
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
                                   var newAnimatedDirective = angular.element('<div  ng-controller="myController" style="height:100%;"  id="mdCommentsAnimated"><div ng-repeat="car in googleComments" bind-scroll-to=".animatedDiv" when-visible="animateElementIn"    class="car-container" style="height:120px;"><div class="car panel-body" id="commentPublish" style="height:100px;"><i class="fa fa-quote-left" style="color:green"></i>{{car}}<i class="fa fa-quote-right" style="color:green"></i></div></div></div>');
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

                                               var newOurCommentAnimatedDirective = angular.element('<div  ng-controller="myController" style="height:100%;"  id="mdCommentsAnimated"><div ng-repeat="car in ourComments" bind-scroll-to=".animatedDiv" when-visible="animateElementIn"   class="car-container" style="height:120px;"><div class="car panel-body" id="commentPublish" style="height:100px;"><i class="fa fa-quote-left" style="color:green"></i>{{car}}<i class="fa fa-quote-right" style="color:green"></i></div></div></div>');
                                               var element = $("#animatedDiv").prepend(newOurCommentAnimatedDirective);
                                               $compile(newOurCommentAnimatedDirective)($scope);

                                           }

                                           htmlBoth += "</br>";
                                           //var htmlOur = "<br>";

                                           //$("#md-comments").append(htmlBoth);
                                           var services = result.Services;

                                           $scope.services = services;
                                           $scope.panelValue = [];
                                           $scope.panelService = [];
                                           $rootScope.i = 0;
                                           if (services.length > 0) {
                                               angular.forEach(services, function (service, key) {

                                                   $scope.panelValue.push(key);
                                                   $scope.panelService.push(service);

                                                   var newDirective = angular.element('<div service-product ng-controller="myController" style="height:200px;"></div>');
                                                   var element = $("#serviceCollection").append(newDirective);


                                                   $compile(newDirective)($scope);
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


            $scope.openFormOld = function () {

                $("#formOld" + $scope.panelVal).show();
            };

            $scope.submitFormOld = function () {

                $("#formOld" + $scope.panelVal).hide();
                var company = $rootScope.company;

                var PlaceID = company.PlaceId;

                var reviews = [];
                var CommentsArray = [];
                var Rating = parseFloat(company.Rating);
                var userRating = '';
                //alert(score);

                var Name = company.Name;
                var Address = company.formatted_address;
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

                var Service = function Service() {
                    //this.Id = 1;
                    //this.Name = "KFC";
                    this.Type = "Food";
                    this.Description = "Burger";
                    this.serviceRating = [];
                    this.serviceComments = [];
                    this.Name = $scope.serviceName;
                    //this.serviceRating = company.Services;
                    this.serviceRating.push($scope.last_value_one);
                    this.serviceComments.push($scope.userCommentOld);
                };

                var Service = new Service();
                var Services = company.Services;
                Services.push(Service);

                company = {
                    "PlaceId": PlaceID, "Name": Name, "Rating": Rating, "Comments": ["", "", "", "", ""], "UsersComments": [5], "Department": null, "Product": Product, "Services": Services
                };

                $rootScope.company = company;

                if (company != null) {
                    dataFactory.updateServiceProduct(company)
                        .then(function (data) {
                            //$scope.places = data;
                            console.log(data);
                            data = $.parseJSON(data.data);
                            services = data.Services;

                            $scope.services = services;
                            var keyIterate = 0;
                            var serviceIterate = '';

                            //$scope.panelValue.length = 0;
                            //$scope.panelService.length = 0;
                            //var panelVal = Math.max($scope.panelValue);

                            angular.forEach(services, function (service, key) {

                                keyIterate = key;
                                serviceIterate = service;

                            });

                            //$rootScope.i = 0;
                            //var panelIterator = 

                            $scope.panelValue.push($rootScope.i);
                            //$scope.panelVal = $scope.panelValue[$rootScope.i];
                            $scope.panelService.push(serviceIterate);
                            var newDirective = angular.element('<div service-product ng-controller="myController" style="height:200px;"></div>');
                            var element = $("#serviceCollection").prepend(newDirective);
                            $compile(newDirective)($scope);


                        }),
                    function (error) {
                        //$scope.status = 'Unable to load place data: ' + error.message;
                    };

                }
            };





            $scope.submit = function () {
                //$("#userFormPanel").hide();
                var company = $rootScope.company;

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

                var Service = function Service() {
                    //this.Id = 1;
                    //this.Name = "KFC";
                    this.Type = "Food";
                    this.Description = "Burger";
                    this.serviceRating = [];
                    this.serviceComments = [];
                    this.Name = $scope.serviceName;
                    //this.serviceRating = company.Services;
                    this.serviceRating.push($scope.last_value);
                    this.serviceComments.push($scope.userComment);
                };

                var Service = new Service();
                var Services = company.Services;
                Services.push(Service);

                //var obje = function Comment() {
                //    this.Author = "X";
                //    this.Text = "very Nice";
                //};


                //var Comment = new obje();



                company = {
                    "PlaceId": PlaceID, "Name": Name, "Rating": Rating, "Comments": ["", "", "", "", ""], "UsersComments": [5], "Department": null, "Product": Product, "Services": Services
                };

                $rootScope.company = company;



                if (company != null) {
                    dataFactory.serviceProduct(company)
                        .then(function (data) {
                            //$scope.places = data;
                            console.log(data);
                            data = $.parseJSON(data.data);
                            services = data.Services;

                            $scope.services = services;
                            var keyIterate = 0;
                            var serviceIterate = '';

                            //$scope.panelValue.length = 0;
                            //$scope.panelService.length = 0;
                            //var panelVal = Math.max($scope.panelValue);

                            angular.forEach(services, function (service, key) {

                                keyIterate = key;
                                serviceIterate = service;

                            });

                            //$rootScope.i = 0;
                            //var panelIterator = 

                            $scope.panelValue.push($rootScope.i);
                            //$scope.panelVal = $scope.panelValue[$rootScope.i];
                            $scope.panelService.push(serviceIterate);
                            var newDirective = angular.element('<div service-product ng-controller="myController" style="height:200px;"></div>');
                            var element = $("#serviceCollection").prepend(newDirective);
                            $compile(newDirective)($scope);


                        }),
                    function (error) {
                        //$scope.status = 'Unable to load place data: ' + error.message;
                    };

                }
            };

            //var element = document.querySelector('[ng-form]');
            $scope.submitSearch = function (query) {
                //alert("ghfghfhfghfjfgfdfjghghf");
                localSearch(query);
            };
            //angular.element('#pac-input').blur( function (event) {



            //   //var handle = function( event ) {
            //   //     var ret,
            //   //             target = this,
            //   //             related = event.relatedTarget,
            //   //             handleObj = event.handleObj;
            //   //     // For mousenter/leave call the handler if related is outside the target.
            //   //     // NB: No relatedTarget if the mouse left/entered the browser window
            //   //     //if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
            //   //         event.type = handleObj.origType;
            //   //         ret = handleObj.handler.apply( this, arguments );
            //   //         //event.type = fix;
            //   //     //}
            //   //     return ret;
            //   // }


            //   //var y = 0;
            //   //if (event.which === 13) {
            //       //handle(event);
                   
            //       //var handleObj = event.handleObj;
            //       //event.type = handleObj.origType;
            //       //handleObj.handler.apply(this);
            //       //y++;

            //       //if(y == 1)
            //            var query = angular.element("#pac-input").val().toString();
            //       //$scope.$apply(function () {
                        
                            
            //            //});
                        
                        

            //   //}
            //        $scope.submitSearch(query);
            //    });
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
                            //var keyIterate = 0;
                            //var serviceIterate = '';

                            //$scope.panelValue.length = 0;
                            //$scope.panelService.length = 0;
                            //var panelVal = Math.max($scope.panelValue);

                            //angular.forEach(services, function (service, key) {

                            //    keyIterate = key;
                            //    serviceIterate = service;

                            //});

                            ////$rootScope.i = 0;
                            ////var panelIterator = 

                            //$scope.panelValue.push($rootScope.i);
                            ////$scope.panelVal = $scope.panelValue[$rootScope.i];
                            //$scope.panelService.push(serviceIterate);
                            //var newDirective = angular.element('<div service-product ng-controller="myController" style="height:200px;"></div>');
                            //var element = $("#serviceCollection").prepend(newDirective);
                            //$compile(newDirective)($scope);


                        }),
                    function (error) {
                        //$scope.status = 'Unable to load place data: ' + error.message;
                    };
                };
            

            
                
                

            
            




        }
    
            
     ]);




    