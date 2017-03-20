myApp
.controller('myController', ['$scope', '$compile', 'dataFactory', '$http', '$rootScope', '$element','$q', '$uibModal',
function ($scope, $compile, dataFactory, $http, $rootScope, $element, $q, $uibModal) {

    var company = $rootScope.company;
    var place = $rootScope.place;
    var h = $(window).height();
    $scope.winHeighthalf = h / 6;

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
            template: '<div class="col-sm-3"></div><div modal-directive class="col-sm-6" style="height:380px;margin-top:0px;margin-bottom:30px;"></div><div class="col-sm-3"></div>',
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
            template: '<div ng-controller="myController" class="col-sm-2"></div><div modal-service class="col-sm-8" style="height:600px;margin-top:50px;"></div><div class="col-sm-2"></div>',
            $scope: true,
            controller: 'ModalInstanceCtrl1',

            size: size,
            //resolve: {
            //    userCommentOldModal: function () {
            //        return $scope.userCommentOldModal;
            //    },
            //    last_value_user_modal: function () {
            //        return $scope.last_value_user_modal;
            //    }

            //}
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.openAddServiceModal = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            template: '<div ng-controller="myController" class="col-sm-3"></div><div modal-addservice class="col-sm-6" style="height:600px;margin-top:50px;"></div><div class="col-sm-3"></div>',
            $scope: true,
            controller: 'ModalInstanceCtrl2',

            size: size,
            //resolve: {
            //    userCommentOldModal: function () {
            //        return $scope.userCommentOldModal;
            //    },
            //    last_value_user_modal: function () {
            //        return $scope.last_value_user_modal;
            //    }

            //}
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };




    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    ///********modal directive ends here*********************//
    //$scope.modalPosition = function () {
    //    var left = angular.element('#pac-input').prop(offsetLeft);
    //    var top = angular.element('#pac-input').prop(offsetTop);
    //    var modalTop = top + angular.element('#pac-input').height() + 5;
    //    $('#modalpanel').offset({top: top, left: modalTop});
    //};



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
                             
             //if (responseData[0] == null && responseData[1] == null) {
             if(responseData != null) {            

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

    Number.prototype.between = function (min, max) {
        return this > min && this < max;
    };









    self.start = function () {

        angular.element("#addServiceButton").show();




        var company = $rootScope.company;
        var place = $rootScope.place;
        var placeID = place.place_id;
        var userComment = '';

        //$('#md-user-input').html("");
        //$("#md-comments").html("");

        $('#placeName').html(place.name);
        $('#placeID').html(place.place_id);
        $('#placeAddress').html(place.formatted_address);
        $('#md-user-input').show();
        //if (place.rating == null)
        //    userRating = parseFloat(jRateScore);
        //else
        //var userRating = parseFloat((parseFloat(jRateScore) + parseFloat(place.rating)) / 2);

        $scope.rateCompany = place.rating;
        $('#rateYoDemoCompany').rateYo({
            rating: $scope.rateCompany,
            starWidth: "25px",
            ratedFill: "#f0ad4e",
            precision: 2,
            onSet: function (rating, rateYoInstance) {

                $scope.last_value_company = rating;
                //$scope.$watch(function () {
                    $scope.inputStarChanges();
                //});
                //$("#animatedCommentsDiv").hide();
            }
        });

        $('document').ready(function () {
            //$('#rateYoDemoBoot').rateYo({
            //    rating: 0,
            //    starWidth: "25px",
            //    ratedFill: "#f0ad4e",
            //    precision: 2,
            //    onSet: function (rating, rateYoInstance) {

            //        $scope.rateYoDemoBoot = rating;
            //    }
            //});
        });
        //var inputStarsCompany = '<div class="row"><div class="col-sm-12" id="rateYoDemoCompany"></div></div>';
        ////$compile(inputStarsCompany)($scope);
                
        //$('#jRateFinal').html(inputStarsCompany);

        $scope.inputStarChanges = function () {
            var company = $rootScope.company;
            var place = $rootScope.place;
            var placeID = place.place_id;
            //$('#jRateFinal').on('click', function () {
            $('#md-form-input').empty();
            $('#md-form-input').show();
            $scope.formComment = [];
            var userRating = 0;
            var rating = $scope.last_value_company;
            if (rating > 0) {
                userRating = (rating + place.rating) / 2;
            }
            else {
                userRating = place.rating;
            }
            $.ajax({
                type: "POST",
                url: "../Home/UserRatingSave",
                data: { PlaceID: placeID, UserRating: userRating, Company: company },
                dataType: "json",
                traditional: true,

                success: function (dataa) {
                    dataa = $.parseJSON(dataa);
                    var responseRating = dataa.Rating;
                    $scope.last_value_company = responseRating;
                    var inputStarsCompany = '<div class="col-sm-12" id="rateYoDemoCompany"></div>';


                    //$compile(inputStarsCompany)($scope);

                    $('#jRateFinal').html(inputStarsCompany);
                }
            });
            var newUserFormAnimatedDirective = angular.element('<div class="row" ng-controller="myController" style="height:100%;"><div id="companyUserComment" when-visible="animateElementIn" class="row car-container" style="background-color:#efefef;height:100%;"><div class="row car panel-body"><div class="row" id="block" ng-controller="myController"><div class="row"><div class="col-md-2"></div><div class="col-md-8"><i class="fa fa-pencil-square-o" aria-hidden="true" style="color:green"></i>&nbsp;&nbsp;Would you like to put a comment as well?&nbsp;&nbsp;<i class="fa fa-pencil-square-o" aria-hidden="true" style="color:green"></i></div><div class="col-md-2"></div></div><div class="row"><form class="col-md-8" name="companyCommentForm" ng-controller="myController" ng-submit="addUserComment()" style="margin-left:138px"><textarea class="col-md-12" ng-model="companyComment" form="companyCommentForm" style="background-color:white;padding-left:100px;border:0px;border-radius:4px;" rows="3"></textarea><input style="background-color:#c9e1c9;border:0px;color:black;border-radius:4px;" class=" btn btn-success form-control btn-block" type="submit" value="Add" /></form></div></div></div></div></div>');
            var element = $compile(newUserFormAnimatedDirective)($scope);
            angular.element("#md-form-input").append(element);
            //});
        };
                


        console.log("Fun times have been started!");

        if (company != null && place != null) {
            $scope.companyPlaceId = place.place_id;
            $("#companyName").html('');
            $("#companyName").append('<strong> ' + company.Name + '</strong>');
            $("#companyNameForService").html('');
            $("#companyNameForService").append('List of Products/Services of ' + company.Name);

           
            $(window).resize(function () {
                var windowWidth = $(window).width();

                if (windowWidth.between(650, 970)) {
                    $("#companyNameForService").html('');
                    $("#companyNameForService").append('List of Products/Services of</br> ' + company.Name);

                } else {
                    $("#companyNameForService").html('');
                    $("#companyNameForService").append('List of Products/Services of ' + company.Name);
                }
            });
            
            dataFactory.googleComments($scope.companyPlaceId)
                   .then(function (data) {
                       console.log(data);
                       result = $.parseJSON(data.data).result;
                       $scope.companyRevivesGoogle = result;
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
                           var newAnimatedDirective = angular.element('<div ng-repeat="car in googleComments track by $index" bind-scroll-to=".animatedDiv" when-visible="animateElementIn" class="car-container"><div class="car panel-body" id="commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
                           var element = $("#animatedDiv").prepend(newAnimatedDirective);
                           $compile(newAnimatedDirective)($scope);
                           //});





                           company.Comments = [];
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
                                   $scope.companyRevivesLocal = result;
                                   //$rootScope.company.Services = result.Services;
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

                                       var newOurCommentAnimatedDirective = angular.element('<div ng-repeat="car in ourComments track by $index" bind-scroll-to=".animatedDiv" when-visible="animateElementIn"   class="car-container"><div class="car panel-body" id="commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
                                       var element = $("#animatedDiv").prepend(newOurCommentAnimatedDirective);
                                       $compile(newOurCommentAnimatedDirective)($scope);

                                   }

                                   htmlBoth += "</br>";
                                   //var htmlOur = "<br>";

                                   //$("#md-comments").append(htmlBoth);
                                   var services = result.Services;

                                   //$scope.panelVal = [];
                                   //$scope.serviceIndex = null;
                                  
                                   //$rootScope.i = 0;
                                   //$scope.i = 0;
                                   $scope.panelValue = [];
                                   $scope.panelService = [];
                                   $scope.panelVal = [];

                                   if (services.length > 0) {
                                       angular.forEach(services, function (service, key) {

                                           $scope.panelValue.push(key);
                                           $scope.panelService.push(service);
                                           //$scope.panelVal[$scope.i] = key;
                                                   
                                           //$scope.panelVal = key;
                                           //$scope.service = service;

                                           var newDirective = angular.element('<div class="row"><div service-product class="serviceandProduct col-md-12" style="float:left;"></div></div>');
                                           var element = $("#serviceCollection").append(newDirective);

                                           $compile(newDirective)($scope);
                                           //$('#rateYoDemoService' + service.Name).rateYo({
                                           //    rating: rateYoDemo,
                                           //    starWidth: "25px",
                                           //    ratedFill: "green",
                                           //    precision: 2,
                                           //    onSet: function (rating, rateYoInstance) {

                                           //        scope.rateYoDemoService = rating;
                                           //    }
                                           //});

                                       });
                                   }

                               })
                }),

                function (error) {
                    $scope.status = 'Unable to load place data: ' + error.message;
                };
        }

        //$('#btnServicePrompt').balloon({
        //    html: true,
        //    position: "top", contents: "<div class='oval-thought'><h4><strong>Would you like to add <br/>a service or product to the company?</strong></h4></div>",
        //    css: {
        //        color: "white",
        //        backgroundColor: "transparent",
        //        paddingTop: "35px",
        //        paddingBottom: "35px",
        //        paddingRight: "30px",
        //        paddingLeft: "30px",
        //        top: "100px",
        //        boxShadow: "none",
        //        border: "none",
        //        zIndex: "32767",
        //        textAlign: "left"
        //    }, tipSize: 0, minLifetime: 10000, showDuration: 1500, hideDuration: 1000,
        //}).delay(5000);
    };

    $scope.companyReviveClick = function () {
        if ($('#md-form-input').css('display', 'none')) {
            $('#md-form-input').hide();
        }
        $('#serviceShowUp2').hide();
                
        $("#serviceOrCompanyName").empty();
        var result = $scope.companyRevivesGoogle;

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
            $("#animatedCommentsDiv").hide();
            $("#serviceShowUp").hide();
            $('#animatedDivServices').hide();
            $("#jRateFinal").show();
            $("#md-user-input").show();
            $("#animatedDiv").show();
            //});





            //    company.Comments = new Array();
            //    for (var i = 0; i < CommentsArray.length; i++) {
            //        company.Comments.push(CommentsArray[i]);
            //    };






        }


        result = $scope.companyRevivesLocal;

        var reviews = result.Comments;
        var ourReviews = result.UsersComments;
        //userComment = dataa.userComment;
        //htmlBoth += "<br><strong>Recent Comment: " + userComment + "</strong><br>";


        console.log(reviews);
        console.log(ourReviews);
        //console.log(response);
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

            var newOurCommentAnimatedDirective = angular.element('<div ng-repeat="car in ourComments track by $index" bind-scroll-to=".animatedDiv" when-visible="animateElementIn"   class="car-container"><div class="car panel-body" id="commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
            var element = $("#animatedDiv").prepend(newOurCommentAnimatedDirective);
            $compile(newOurCommentAnimatedDirective)($scope);

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
                $scope.ourReviews = [];
                $scope.ourReviews = dataa.UsersComments;
                //$scope.ourComments.push(userComment);
                $scope.ourReviews.reverse();
                //$scope.ourComments.push;
                //var i = $scope.ourComments.indexOf(Math.max(...arr));


                //$scope.ourComments.push(review);

                //$scope.ourComments.reverse();
                $scope.arr = [];
                $scope.arr = $scope.ourReviews;
                //$scope.arr.push($scope.ourComments[$scope.ourComments.length - 1]);
                ////arr = $scope.ourComments;

                //angular.forEach($scope.ourComments, function (comment, key) {
                //    if (comment === userComment)
                //        arr.push(comment);

                //});
                $("#animatedDiv").hide();
                $('#animatedDivServices').hide();
                $scope.X = [1, 2, 3, 4, 5, 6, 7];
                $("#animatedCommentsDiv").show();

                var ourCommentsAnimatedDirective = angular.element('<div ng-repeat="car in ourReviews track by $index" bind-scroll-to=".animatedCommentsDiv" when-visible="animateElementIn"   class="car-container col-sm-12"><div class="car panel-body" id="commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
                $compile(ourCommentsAnimatedDirective)($scope);
                //angular.element('<div ng-controller="myController" style="height:100%;"><div ng-repeat="car in arr" bind-scroll-to=".animatedDiv" when-visible="animateElementIn"    class="car-container" style="height:120px;"><div class="car panel-body" style="height:100px;"><i class="fa fa-quote-left" style="color:green"></i>{{car}}<i class="fa fa-quote-right" style="color:green"></i></div></div></div>');
                var element = $("#animatedCommentsDiv").html(ourCommentsAnimatedDirective);
                $("#animatedCommentsDiv").animate();
                        
                       

                //angular.element("#animatedDiv").prepend(ourReviews);
                console.log($scope.ourReviews);



            }
        });
    };




    $scope.serveComments = function () {
        if ($('#md-form-input').css('display', 'none')) {
            $('#md-form-input').hide();
        }
        if ($('#serviceShowUp').css("display") == 'none') {
            $("#jRateFinal").hide();
            $("#md-user-input").hide();
            $('#serviceShowUp').children().remove();
            //$("#pac-input").val();
                   
        }
        else {
            //$("#serviceShowUp").hide();
            //$('#serviceShowUp').fadeToggle('fast');
            $('#serviceShowUp').children().remove();
        }

        var serveNameEach = $scope.serveEditEach;

        var company = $rootScope.company;
        var services = [];
        var services = company.Services;
        //var comments = [];
        $scope.comms = [];

        angular.forEach(services, function (service, key) {
            if (service.Name == serveNameEach) {
                var rateYoValue = 0;
                if (service.serviceRating != null) {
                    var rateYoValue = service.serviceRating;
                } else {
                    rateYoValue = 0;
                }
                //var inputStars = '<div class="col-sm-6" style="height:40px;"><div class="col-sm-12" id="rateYoDemoView"></div></div>';
                
               
                
                
                //$compile(inputStars)($scope);
                var element1 = $("#serviceShowUp").prepend('<div class="col-sm-4" style="height:40px;padding-left:30px;">' + service.Name + '</div>');
                
                
                $scope.$watch(function () {
                    $("#rateYoDemoView").rateYo({
                        rating: rateYoValue,
                        starWidth: "25px",
                        ratedFill: "#f0ad4e",
                        precision: 2,
                        onSet: function (rating, rateYoInstance) {

                            $scope.rateYoDemoService = rating;
                        },
                        onInit: function (rating, rateYoInstance) {

                            console.log("RateYo initialized! with " + rating);
                        }
                    })
                },
                        function (newValue, oldValue, $scope) {
                            //$("#rateYoDemoService" + name).rateYo({ rating:newValue });
                        });
                $("#serviceShowUp").show();
                $("#serviceShowUp2").show();

                
                //$("#companyName").append(' >> ' + company.Name + ' >> ');
                $("#serviceOrCompanyName").empty();
                //$("#serviceOrCompanyName").append("of ");

                $("#serviceOrCompanyName").append(' > ' + service.Name);
                
                $('#animatedDivServices').empty();


                angular.forEach(service.serviceComments, function (comment, index) {

                    $scope.comms.push(comment);
                });
               
                $("#animatedDiv").hide();

                //angular.forEach($scope.comms, function (car, key) {

                var newAnimatedDirective = angular.element('<div ng-repeat="car in comms track by $index" bind-scroll-to=".animatedDivServices" when-visible="animateElementIn" class="car-container"><div class="car panel-body commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
                var element = $("#animatedDivServices").prepend(newAnimatedDirective);
                $compile(newAnimatedDirective)($scope);
                $('#animatedDivServices').show();

                //});
            }

        });
        //});
              
    };


    $scope.openFormOld = function () {
        var company = $rootScope.company;
        $scope.services = company.Services;

        //scope.serviceDetails;
        //scope.last_value_one;
                
        //$scope.service = $scope.services[$scope.serviceIndex];
        $('.modal-dialog').addClass('row');
        $('.modal-dialog').css('margin-top', '100px');
        //$("#formOld" + $scope.panelVal).show();
        //$scope.last_value_user_modal = 3;
        //$scope.xyz = 1;
        //$('document').ready(function(){
        //     $('#rateYoDemo').rateYo({
        //         rating: $scope.rateYoDemoServiceInit
        //    });
        //});


        var serveNameEach = $scope.serveEditEach;

        var company = $rootScope.company;
        var services = [];
        var services = company.Services;
        //var comments = [];
        $scope.comms = [];

        angular.forEach(services, function (service, key) {
            if (service.Name == serveNameEach) {
                var rateYoValue = 0;
                if (service.serviceRating != null) {
                    var rateYoValue = service.serviceRating;
                } else {
                    rateYoValue = 0;
                }
                //var inputStars = '<div class="col-sm-6" style="height:40px;"><div class="col-sm-12" id="rateYoDemoView"></div></div>';




                //$compile(inputStars)($scope);
                var element1 = $("#serviceShowUp").prepend('<div class="col-sm-4" style="height:40px;padding-left:30px;">' + service.Name + '</div>');


                $scope.$watch(function () {
                    $("#rateYoDemo").rateYo({
                        rating: rateYoValue,
                        starWidth: "25px",
                        ratedFill: "#f0ad4e",
                        precision: 2,
                        onSet: function (rating, rateYoInstance) {

                            $scope.rateYoDemoService = rating;
                        },
                        onInit: function (rating, rateYoInstance) {

                            console.log("RateYo initialized! with " + rating);
                        }
                    })
                },
                        function (newValue, oldValue, $scope) {
                            //$("#rateYoDemoService" + name).rateYo({ rating:newValue });
                        });
                //$("#serviceShowUp").show();
                //$("#serviceShowUp2").show();


                ////$("#companyName").append(' >> ' + company.Name + ' >> ');
                //$("#serviceOrCompanyName").empty();
                ////$("#serviceOrCompanyName").append("of ");

                //$("#serviceOrCompanyName").append(' > ' + service.Name);

                //$('#animatedDivServices').empty();


                //angular.forEach(service.serviceComments, function (comment, index) {

                //    $scope.comms.push(comment);
                //});

                //$("#animatedDiv").hide();

                ////angular.forEach($scope.comms, function (car, key) {

                //var newAnimatedDirective = angular.element('<div ng-repeat="car in comms track by $index" bind-scroll-to=".animatedDivServices" when-visible="animateElementIn" class="car-container"><div class="car panel-body commentPublish" style="color:black"><i class="fa fa-quote-left" style="color:green;font-size:10px;"></i>&nbsp;{{car}}&nbsp;<i class="fa fa-quote-right" style="color:green;font-size:10px;"></i></div></div>');
                //var element = $("#animatedDivServices").prepend(newAnimatedDirective);
                //$compile(newAnimatedDirective)($scope);
                //$('#animatedDivServices').show();

                //});

                $scope.userCommentOldModal = service.serviceComments;
                $scope.modalTitle = service.Name;
            }

        });
               
               
                $scope.openServiceModal('lg');
                //$("#userService" + $scope.panelVal).hide();
     };



    $scope.userFormModalSubmit = function () {
                //$('#userService' + $scope.panelVal).show();

                var company = $rootScope.company;
                $scope.service = company.Services.pop();
                var rate = 3;
                $scope.rate = {
                    
                };
                //$scope.data = {};
                //$scope.data.userCommentOldModal = '';
                $scope.service.serviceComments.push($scope.userCommentOldModal);
                //$scope.data.last_value_user_modal = '';
               
                var userRatingModal = $scope.rateYoDemo;
                //var userCommentModal = $scope.serviceDetails + '<br>' + $scope.userCommentOldModal;
                var userRating = 0;
                if (userRatingModal > 0) {
                    userRating = (userRatingModal + $scope.rateYoDemo) / 2;
                }
                else {
                    userRating = $scope.last_value_one;
                }
                $scope.service.serviceRating = userRating;
               

                company.Services.push($scope.service);

                dataFactory.updateserviceProduct(company)
                    .then(function (dataa) {
                        dataa = $.parseJSON(dataa);
                        
                        $scope.services = dataa.Services;
                        var service = $scope.services.pop();
                        

                        angular.element(document.querySelector("#commentPublishPanelDiv" + $scope.panelVal)).parent().parent().remove();

                        var newDirective2 = angular.element('<div class="row"><div service-product ng-controller="myController" class="serviceandProduct col-md-12" style="float:left;"></div></div>');

                        var element = $("#serviceCollection").prepend(newDirective2);
                        // $compile(newDirective2)($scope);
                        $compile(newDirective2)($scope);
                        //var inputStarsCompany = angular.element('<input-stars max="5" on-star-click="inputStarChanges()" icon-full="fa-star" icon-base="fa fa-fw" icon-empty="fa-star-o" ng-model="last_value_user_modal"></input-stars>');


                        //$compile(inputStarsCompany)($scope);

                        //$('#serviceRating' + $scope.panelVal).html(inputStarsCompany);
                        //$scope.serviceDetails = '<strong>Service/Product:</strong> ' + $scope.service.Name + '<br>' + '<i class="fa fa-commenting"></i> ' + $scope.service.serviceComments + '</br></br>';

                       
                    }
                );
                //var newUserFormAnimatedDirective = angular.element('<div class="row" ng-controller="myController" style="height:100%;"><div id="companyUserComment" when-visible="animateElementIn" class="row car-container" style="height:100%"><div class="row car panel-body"><div class="row" id="block" ng-controller="myController"><div class="row"><div class="col-md-2"></div><div class="col-md-8"><i class="fa fa-pencil-square-o" aria-hidden="true" style="color:green"></i>&nbsp;&nbsp;Would you like to put a comment as well?&nbsp;&nbsp;<i class="fa fa-pencil-square-o" aria-hidden="true" style="color:green"></i></div><div class="col-md-2"></div></div><div class="row"><form class="col-md-8" name="companyCommentForm" ng-controller="myController" ng-submit="addUserComment()" style="margin-left:138px"><textarea class="col-md-12" ng-model="companyComment" form="companyCommentForm" style="background-color:white;padding-left:100px;border:0px;border-radius:2px;" rows="3"></textarea><input  style="background-color:#c9e1c9;border:0px;color:black" class=" btn btn-success form-control btn-block" type="submit" value="Add" /></form></div></div></div></div></div>');
                //var element = $compile(newUserFormAnimatedDirective)($scope);
                //angular.element("#md-form-input").append(element);

            };

            $scope.submitFormOld = function () {
              
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
                        
                        ser = service;
                      
                    }
                   
                });
                sum = ser.serviceRating[0];
                sum = (sum + $scope.last_value_user) / 2;
                ser.serviceRating = [];
                ser.serviceRating.push(sum);
                ser.serviceComments.push($scope.userCommentOld);
                
                company = {
                    "PlaceId": PlaceID, "Name": Name, "Rating": Rating, "Comments": ["", "", "", "", ""], "UsersComments": [5], "Department": null, "Products": Products, "Services": Services
                };

                $rootScope.company = company;

                if (company != null) {
                    dataFactory.updateserviceandProduct(company)
                        .then(function (data) {
                            //$scope.places = data;
                            console.log(data);
                            data = $.parseJSON(data.data);
                           var services = data.Services;

                            $scope.services = data.Services;
                           
                            var keyIterate = 0;
                            var serviceIterateUpdate = '';
                            
                            angular.forEach(services, function (service, key) {
                              
                                if (service.Name == $scope.service.Name) {
                                    
                                    serviceIterateUpdate = service;
                                    
                                }

                             });

                                        $scope.panelValue.push($rootScope.i);
                                        //$scope.panelVal = $scope.panelValue[$rootScope.i];
                                        $scope.panelService.push(serviceIterateUpdate);
                                       
                                        angular.element(document.querySelector("#commentPublishPanelDiv" + $scope.panelVal)).parent().parent().remove();
                                       
                                        var newDirective2 = angular.element('<div class="row"><div service-product ng-controller="myController" class="serviceandProduct col-md-12" style="height:200px;float:left;"></div></div>');
                                        
                                        var element = $("#serviceCollection").prepend(newDirective2);
                                       // $compile(newDirective2)($scope);
                                        $compile(newDirective2)($scope);
                                       
                        }),
                    function (error) {
                        //$scope.status = 'Unable to load place data: ' + error.message;
                    };

                }
            };





            $scope.submitOne = function () {

                var modal = document.getElementsByClassName("modal-backdrop");
                var body = document.getElementsByTagName("body");

                body[0].removeChild(body[0].childNodes[0]); 
                //body[0].removeClass("modal-open");
                //var dialog = document.getElementsByClassName("modal fade");
                body[0].removeChild(body[0].childNodes[0]);

                var company = $rootScope.company;
                //angular.element("#serviceForm").hide();

                
                var Service = function Service() {
                    //this.Id = 1;
                    //this.Name = "KFC";
                    this.Type = "";
                    this.Description = "";
                    this.serviceRating = [];
                    this.serviceComments = [];
                    this.Name = $scope.serviceName;
                    //this.serviceRating = [];
                    //this.serviceRating = company.Services;
                    this.serviceRating.push($scope.rateYoDemoBoot);
                    this.serviceComments.push($scope.userComment);
                };

                var Service = new Service();
                var Services = company.Services;
                Services.push(Service);


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
                            //var panelVal = Math.max($scope.panelValue);
                            $scope.panelVal = [];
                            //$scope.service = [];
                            $scope.panelValue = [];
                            $scope.panelService = [];
                            angular.forEach(services, function (service, key) {

                                if (service.Name == $scope.serviceName) {
                                    $rootScope.i = key;
                                    $scope.panelValue[key] = $rootScope.i;
                                    $scope.panelService[key] = services[$rootScope.i];
                                    $scope.service = service;
                                    $scope.panelVal[key] = key;
                                    var newDirective = angular.element('<div class="row"><div service-product ng-controller="myController" class="serviceandProduct col-md-12" style="float:left;"></div></div>');
                                    var element = $("#serviceCollection").prepend(newDirective);
                                    $compile(newDirective)($scope);
                                }
                                    
                                

                            });

                            


                        }),
                    function (error) {
                        //$scope.status = 'Unable to load place data: ' + error.message;
                    };

                }

                
            };



 $scope.serviceAdding = function () {

                //$('#rateYoDemoBoot').rateYo({
                //    rating: 0,
                //    starWidth: "25px",
                //    ratedFill: "#f0ad4e",
                //    precision: 2,
                //    onSet: function (rating, rateYoInstance) {

                //        $scope.rateYoDemoBoot = rating;
                //    }
                //});

     $('.modal-dialog').addClass('row');
     $('.modal-dialog').css('margin-top', '100px');
     $scope.openAddServiceModal('lg');



     //angular.element("#serviceForm").show();
       

        //angular.element("#incept").;
    };




            $scope.showServiceOrProduct = function () {
                //if (angular.element("#serviceOrProductPanels div#serviceCollection").html() == '') {
                //    angular.element("#serviceOrProductPanels").hide();
                //}
                        angular.element("#serviceOrProductPanels").show();
                    //}
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




    