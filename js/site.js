// Write your Javascript code.
'use: strict';
var angularMongo = angular.module('angularMongo',[])
    .controller('MainController', function ($scope) {
        $scope.map = {
            center: {
                    latitude: 45,
                    longitude:-75
                },
            zoom: 8     
        }

        
    });



   


