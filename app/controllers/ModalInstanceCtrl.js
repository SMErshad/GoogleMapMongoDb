myApp.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', '$rootScope', function ($scope, $uibModalInstance, $rootScope) {

  //$scope.items = items;
  //$scope.selected = {
  //  item: $scope.items[0]
    //};
    var self = this;

  $scope.ok = function () {
      $uibModalInstance.close();
      //$rootScope.autocomplete.val('');
      //$('#pac-input').val('');
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
      //$rootScope.autocomplete.val('');
      //$('#pac-input').val('');
  };
}]);
