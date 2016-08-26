//myApp.controller('ModalDemoCtrl', function ($scope, $uibModal) {

//  //$scope.items = ['item1', 'item2', 'item3'];

//  $scope.animationsEnabled = true;

//  $scope.open = function (size) {

//    var modalInstance = $uibModal.open({
//      animation: $scope.animationsEnabled,
//      templateUrl: '<div modal-directive class="col-md-12" style="height:500px"></div>',
//      controller: 'ModalInstanceCtrl',
//      size: size,
//      resolve: {
//        items: function () {
//          //return $scope.items;
//        }
//      }
//    });

//    modalInstance.result.then(function () {
//      //$scope.selected = selectedItem;
//    }, function () {
//      //$log.info('Modal dismissed at: ' + new Date());
//    });
//  };

//  $scope.toggleAnimation = function () {
//    $scope.animationsEnabled = !$scope.animationsEnabled;
//  };

//});
