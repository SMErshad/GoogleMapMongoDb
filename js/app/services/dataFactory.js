myApp
    .factory('dataFactory', ['$http', '$rootScope', function ($http, $rootScope) {
        
        //company=JSON.stringify(company );
        //var urlBase = '/api/customers';
        var dataFactory = {};
        var company = $rootScope.company;
        var place = $rootScope.place;
        //var Name = $rootScope.Name;
        //var placeID = $rootScope.placeID;

        dataFactory.getCompany = function (placeID) {
            //var company = $rootScope.company;
            //var data = $.param({
            //    company: company
            //});
            var http = $http({
                method: 'POST',
                url: '../Home/GetCompany',
                //traditional: true,
                data: JSON.stringify(placeID),
                dataType: "json"
            });
            return http;
        };

        dataFactory.updateServiceProduct = function (company) {

            var http = $http({
                method: 'POST',
                url: '../ServiceProduct/UpdateServiceProduct',
                traditional: true,
                data: company
            });
            return http;
        };

        dataFactory.serviceProduct = function (company) {
            //var company = $rootScope.company;
            //var data = $.param({
            //    company: company
            //});
                var http = $http({
                    method: 'POST',
                    url: '../ServiceProduct/ServiceProduct',
                    traditional: true,
                    data: company
                });
                return http;    
        };
        dataFactory.userCreatedCompany = function (company) {
            //var company = $rootScope.company;
            //var data = $.param({
            //    company: company
            //});
            var http = $http({
                method: 'POST',
                url: '../ServiceProduct/UserCreatedCompany',
                traditional: true,
                data: company
            });
            return http;
        };


        dataFactory.googleComments = function (PlaceID) {
            //var PlaceID = place.place_id;
            if(PlaceID != null)
            {
               return $http({
                    method: 'POST',
                    url: '../Home/GoogleComments',
                    //traditional: true,
                    data: JSON.stringify(PlaceID),
                    dataType: "json"
                });
            }
            //return http;
        };


        dataFactory.savePlace = function (company) {
           
            var http = $http({
                method: 'POST',
                url: '../Home/SavePlace',
                traditional: true,
                data: company
            });
            return http;
        };

        //dataFactory.editPlace = function (company) {
        //    //var company = $rootScope.company;
        //    //var data = $.param({
        //    //    company: company
        //    //});
        //    var http = $http({
        //        method: 'POST',
        //        url: '../Home/Editplace',
        //        traditional: true,
        //        data: company
        //    })
        //.then(function (results) {
        //    return results;
        //}).catch(function (e) {

        //});
        //};

        dataFactory.updateServiceProduct = function(company){
            var http = $http({
                method: 'POST',
                url: '../ServiceProduct/UpdateServiceProduct',
                traditional: true,
                data: company
            });
            return http;
        }


        dataFactory.search = function (Name) {
            var http = $http({
                method: 'POST',
                url: '../Search/Search',

                data: JSON.stringify(Name),
                dataType: "json"
            });
            return http;
        };

        dataFactory.searchLocal = function (result) {
            var http = $http({
                method: 'POST',
                url: '../Search/SearchLocal',

                data: JSON.stringify(result),
                dataType: "json"
            });
            return http;
        };
        

        
        return dataFactory;
    }]);

