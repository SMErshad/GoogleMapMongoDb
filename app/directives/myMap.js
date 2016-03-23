myApp
    .directive('myMap',['$rootScope', function($rootScope) {
    // directive link function
        var link = function(scope, element, attrs) {

            //element.bind("mouseenter", function () {
            //    //scope.globe.start();
            //})

            var map, infoWindow;
            var markers = [];
            //var company = "";
            //$rootScope.company = company;
        
            // map config
            var mapOptions = {
                center: new google.maps.LatLng(50, 2),
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
        
            // init the map
            function initMap() {
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: -33.8688, lng: 151.2195 },
                    zoom: 10
                });

                var input = document.getElementById('pac-input');

                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', map);

                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                var infowindow = new google.maps.InfoWindow();
                var marker;


                //marker.addListener('click', function() {
                //  infowindow.open(map, marker);
                //});

                autocomplete.addListener('place_changed', function () {
                    infowindow.close();
                    var place = autocomplete.getPlace();
                    if (!place.geometry) {
                        return;
                    }

                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(13);
                    }


                    marker = new google.maps.Marker({
                        map: map,
                        // Define the place with a location, and a query string.

                        // Attributions help users find your site again.
                        attribution: {
                            source: 'Google Maps JavaScript API',
                            webUrl: 'https://developers.google.com/maps/'
                        }
                        //draggable: true,
                        //animation: google.maps.Animation.DROP
                    });


                    // Set the position of the marker using the place ID and location.
                    marker.setPlace({
                        placeId: place.place_id,
                        location: place.geometry.location
                    });

                    marker.setVisible(true);


                    google.maps.event.addListener(marker, 'click', function () {
                        htmlBoth = '<br>';

                        var placeID = place.place_id;

                        var reviews = [];
                        var CommentsArray = [];
                        var Rating = parseFloat(place.rating);
                        var userRating = '';
                        //alert(score);
                        var PlaceId = place.place_id;
                        var Name = place.name;
                        var Address = place.formatted_address;
                        var jRateScore = "";
                        var KFC = "KFC";
                        var Food = "Food";
                        var Burger = "Burger";

                        var Product = function Product() {
                            this.Id = 1;
                            this.Name = "KFC";
                            this.Rating = 4.3;
                            this.Comments = ["hgtyftyfyft", "hgddjfghgf"];
                        };
                        var Product = new Product();

                        var Service = function Service() {
                            //this.Id = 1;
                            this.Name = "KFC";
                            this.Type = "Food";
                            this.Description = "Burger";
                            //this.serviceRating = [];
                            this.serviceRating = ["4.3"];
                            this.serviceComments = ["hgtyftyfyft", "hgddjfghgf"];
                        };

                        var Service = new Service();
                        var Services = [];
                        Services.push(Service);

                        

                        var obje = function Comment() {
                            this.Author = "X";
                            this.Text = "very Nice";
                        };


                        //var Comment1 = new obje();
                        //var Comment2 = new obje();
                        //var Comment3 = new obje();

                        
                       var company = {
                            "PlaceId": PlaceId, "Name": Name, "Rating": Rating, "Comments": ["", "", "", "", ""], "UsersComments": [5], "Department": null, "Product": Product, "Services": Services
                       };


                       infowindow.setContent('<div id="iw-container" class=""><strong>' + place.name + '</strong><br>' +
                      'Place ID: ' + place.place_id + '<br>' +
                      place.formatted_address + '<br><br></div>');


                       infowindow.open(map, marker);
                        //$rootScope.company = company;
                       

                        var elem = angular.element(document.querySelector('[ng-app=myApp]'));
                        var injector = elem.injector();
                        var $rootScope = injector.get('$rootScope');

                        $rootScope.$apply(function () {
                            $rootScope.company = company;
                            $rootScope.place = place;
                            $rootScope.Name = Name; 
                        });


                        scope.globe.start();


                        //$('#md-user-input').html("");
                        //$("#md-comments").html("");

                        //$('#md-user-input').prepend('<div id="iw-container" class=""><strong>' + place.name + '</strong><br>' +
                        //                              'Place ID: ' + place.place_id + '<br>' + place.formatted_address + '<br><br>' + '<div id="jRateFinal" style="height:70px;width:350px;"class="jRate"></div><div id="block" style="height:200px;width:500px;" hidden>Would you like to put a comment as well?<br><form><textarea id="addComment" type></textarea><br><input type="submit" id="submitComment" value="Add a Comment"></form></div>');

                        //$(".jRate").jRate({
                        //    startColor: 'cyan',
                        //    endColor: 'blue',
                        //    rating: place.rating,
                        //    onSet: function (score) {
                        //        jRateScore = score;
                        //        if (place.rating == null)
                        //            userRating = parseFloat(jRateScore);
                        //        else
                        //            userRating = parseFloat((parseFloat(jRateScore) + parseFloat(place.rating)) / 2);
                        //        //alert(score);
                        //        $("#block").show();
                        //        $("#block textarea").animate({
                        //            width: "400%",
                        //            opacity: 0.4,
                        //            fontSize: "1em"
                        //            //borderWidth: "10px"
                        //        }, 7000);
                        //        $("#submitComment").click(function (e) {
                        //            e.preventDefault();
                        //            addComment(placeID, $("#addComment").val());
                        //            $("#block").hide();
                        //        });


                        //        $.ajax({
                        //            type: "POST",
                        //            url: "../Home/UserRatingSave",
                        //            data: { PlaceID: placeID, UserRating: userRating },
                        //            dataType: "json",

                        //            success: function (dataa) {
                        //                dataa = $.parseJSON(dataa);
                        //                var responseRating = dataa.Rating;
                        //                console.log(responseRating);

                        //                document.getElementById('jRateFinal').innerHTML = "<br>";

                        //                //if (responseRating == NaN) {
                        //                $(".jRate").jRate({
                        //                    startColor: 'cyan',
                        //                    endColor: 'blue',
                        //                    rating: responseRating,
                        //                    readonly: true
                        //                });


                        //            }
                        //        });

                        //    }
                        //});



                        //$.ajax({
                        //    type: "POST",
                        //    url: "../Home/GoogleComments",
                        //    data: { PlaceID: placeID },
                        //    dataType: "json",

                        //    success: function (dataJson) {


                        //        console.log(dataJson);
                        //        result = $.parseJSON(dataJson).result;
                        //        reviews = result.reviews;
                        //        //htmlBoth += "<div>";
                        //        if (reviews != undefined) {
                        //            $.each(reviews, function (index, item) {
                        //                console.log("GoogleComment[" + index + "]: " + item);
                        //                CommentsArray.push(item.text);
                        //                //htmlBoth += "<br><strong>GoogleComment[" + index + "]:</strong> " + item.text + "<br>";

                        //            });

                        //            company.Comments = new Array();
                        //            for (var i = 0; i < CommentsArray.length; i++) {

                        //                company.Comments.push(CommentsArray[i]);

                        //            };

                        //            $("#md-comments").append(htmlBoth);
                        //        }


                        //        $.ajax({
                        //            type: "POST",
                        //            url: "../Home/SavePlace",
                        //            data: JSON.stringify(company),
                        //            contentType: "application/json",
                        //            dataType: "json",
                        //            traditional: true,

                        //            success: function (response) {
                        //                console.log(response);
                        //                var result = $.parseJSON(response);
                        //                var reviews = result.Comments;
                        //                var ourReviews = result.UsersComments;
                        //                //userComment = dataa.userComment;
                        //                //htmlBoth += "<br><strong>Recent Comment: " + userComment + "</strong><br>";


                        //                console.log(reviews);
                        //                console.log(ourReviews);
                        //                console.log(response);
                        //                //result = $.parseJSON(response);

                        //                //userComment = response.userComment;
                        //                //htmlBoth += "<br><strong>Recent Comment: " + userComment + "</strong><br>";


                        //                if (!($.isEmptyObject(ourReviews))) {
                        //                    $.each(ourReviews, function (index, item) {
                        //                        console.log("OurComment[" + index + "]: " + item);
                        //                        CommentsArray.push(item);
                        //                        htmlBoth += "<br><strong>OurComment[" + index + "]:</strong> " + item + "<br>";

                        //                    });
                        //                }
                        //                if (!($.isEmptyObject(reviews))) {
                        //                    $.each(reviews, function (index, item) {
                        //                        console.log("GoogleComment[" + index + "]: " + item);
                        //                        CommentsArray.push(item);
                        //                        htmlBoth += "<br><strong>GoogleComment[" + index + "]:</strong> " + item + "<br>";

                        //                    });
                        //                }

                        //                htmlBoth += "</br>";
                        //                //var htmlOur = "<br>";

                        //                $("#md-comments").append(htmlBoth);



                        //                 }
                        //        });



                        //    },
                        //    error: function (err) {
                        //        console.log(err);
                        //    }
                        //});

                       


                       

                    });
                });
            }


            //scope.$on('initMap', function (event, data) {
            //    scope.initMap();
            //});
        
            // place a marker
            //function setMarker(map, position, title, content) {
            //    var marker;
            //    var markerOptions = {
            //        position: position,
            //        map: map,
            //        title: title,
            //        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            //    };

            //    marker = new google.maps.Marker(markerOptions);
            //    markers.push(marker); // add marker to array
            
            //    google.maps.event.addListener(marker, 'click', function () {
            //        // close window if not undefined
            //        if (infoWindow !== void 0) {
            //            infoWindow.close();
            //        }
            //        // create new window
            //        var infoWindowOptions = {
            //            content: content
            //        };
            //        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            //        infoWindow.open(map, marker);
            //    });
            //}
        
            // show the map and place some markers
            initMap();
        
            //setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
            //setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
            //setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
        };
    
        return {
            restrict: 'EAC',
            template: '',
            replace: true,
            link: link
        };
}]);