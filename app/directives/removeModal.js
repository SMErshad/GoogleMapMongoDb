myApp.directive('removeModal', ['$document', '$window', function ($document, $window) {
    return {
        restrict: 'A',
        scope:true,
        link: function (scope, element, attrs) {
            element.on('click', function (event) {
                //event.preventDefault();
                //if(event.target.id == 'ok')
                //    $modalInstance.close();
                //if (event.target.id == 'cancel')
                //    $modalInstance.dismiss('cancel');
                //$(".modal-backdrop").remove();
                //scope.$apply(function () {

                    scope.$eval(attrs.removeModal);
                    
                    //scope.userCreatedSubmit();
                    //$window.location.href = "BootstrapIndex";
                    var modal = document.getElementsByClassName("modal-backdrop");
                    var body = document.getElementsByTagName("body");

                    body[0].removeChild(modal[0]);
                    //body[0].removeClass("modal-open");
                    var dialog = document.getElementsByClassName("modal fade");
                    body[0].removeChild(dialog[0]);
                    

                //});
                
               
                
                
                //$document[0].body.classList.remove('modal-open');

                //angular.element($document[0].getElementsByClassName('modal-backdrop')).remove();
                //angular.element($document[0].getElementsByClassName('modal')).remove();
                
                
            });
        }
    };
}]);