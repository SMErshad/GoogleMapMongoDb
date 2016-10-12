myApp.controller('ModalInstanceCtrl1', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

    //$scope.items = items;
    //$scope.selected = {
    //  item: $scope.items[0]
    //};
    var self = this;

    $scope.ok = function () {
        //$uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
