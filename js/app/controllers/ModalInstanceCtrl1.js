﻿myApp.controller('ModalInstanceCtrl1', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance, userCommentOldModal, last_value_user_modal) {

    $scope.userCommentOldModal = userCommentOldModal;
    $scope.last_value_user_modal = last_value_user_modal;
    //var self = this;
    //$scope.ok;

    $scope.ok = function () {
        $uibModalInstance.close();
    };
   

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
