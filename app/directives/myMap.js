myApp
    .directive('myMap',['$rootScope', function($rootScope) {
    // directive link function
        var link = function(scope, element, attrs) {

            scope.$eval(attrs.myMap);

            var map, infoWindow;
            var markers = [];
            $rootScope.flag1 = false;
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
                //scope.$apply(function () {
                    var autocomplete = new google.maps.places.Autocomplete(input);
                //});
                
                autocomplete.bindTo('bounds', map);

                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                scope.infowindow = new google.maps.InfoWindow();
                scope.marker = null;

                autocomplete.addListener('place_changed', function () {
                    //flag = true;
                    $rootScope.flag1 = true;
                    scope.infowindow.close();
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

                    //scope.$apply(function () {
                        scope.marker = new google.maps.Marker({
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
                        scope.marker.setPlace({
                            placeId: place.place_id,
                            location: place.geometry.location
                        });

                        
                    
                    scope.marker.setVisible(true);

                    google.maps.event.addListener(scope.marker, 'click', function () {
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


                       scope.infowindow.setContent('<div id="iw-container" class=""><strong>' + place.name + '</strong><br>' +
                      'Place ID: ' + place.place_id + '<br>' +
                      place.formatted_address + '<br><br></div>');


                       scope.infowindow.open(map, scope.marker);
                        //$rootScope.company = company;
                       

                        //var elem = angular.element(document.querySelector('[ng-app=myApp]'));
                        //var injector = elem.injector();
                        //var $rootScope = injector.get('$rootScope');
                       var elem = angular.element(document.querySelector('[ng-app=myApp]'));
                       var injector = elem.injector();
                       var $rootScope = injector.get('$rootScope');

                        $rootScope.$apply(function () {
                            $rootScope.company = company;
                            $rootScope.place = place;
                            $rootScope.Name = Name;
                            $rootScope.flag1 = true;
                            $rootScope.infowindow = scope.infowindow;
                            $rootScope.marker = scope.marker;
                        });


                        scope.globe.start();
                         
                    });
                });
            }

        
            // show the map and place some markers
            
            initMap();
            
        };
    
        return {
            restrict: 'EAC',
            template: '',
            scope: true,
            replace: true,
            link: link
        };
}]);