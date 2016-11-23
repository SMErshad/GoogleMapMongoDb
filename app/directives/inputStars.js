myApp

    //.directive('inputStars', function () {

    //    var directive = {

    //        restrict: 'EA',
    //        //replace: true,
    //        template: '<ul ng-class="listClass">' +
    //        '<li style="height:20px;" ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' +
    //        '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
    //        '</li>' +
    //        '</ul>',
    //        require: 'ngModel',
    //        scope: {
    //            last_value: '=',
    //            setValue: '&',
    //            last_value_one: '=',
    //            last_value_service: '=',
    //        },

    //        link: link

    //    };

    //    return directive;

    //    function link(scope, element, attrs, ngModelCtrl) {

    //        scope.items = new Array(+attrs.max);

    //        var emptyIcon = attrs.iconEmpty || 'fa-star-o';
    //        var iconHover = attrs.iconHover || 'angular-input-stars-hover';
    //        var fullIcon = attrs.iconFull || 'fa-star';
    //        var iconBase = attrs.iconBase || 'fa fa-fw';
    //        scope.listClass = attrs.listClass || 'angular-input-stars';
    //        scope.readonly  = ! (attrs.readonly === undefined);

    //        ngModelCtrl.$render = function () {

    //            scope.last_value = ngModelCtrl.$viewValue || 0;

    //        };

    //        scope.getClass = function (index) {

    //            return index >= scope.last_value ? iconBase + ' ' + emptyIcon : iconBase + ' ' + fullIcon + ' active ';

    //        };

    //        scope.unpaintStars = function ($index, hover) {

    //            scope.paintStars(scope.last_value - 1, hover);

    //        };

    //        scope.paintStars = function ($index, hover) {

    //            //ignore painting, if readonly
    //            if (scope.readonly) {
    //                return;
    //            }
    //            var items = element.find('li').find('i');

    //            for (var index = 0; index < items.length; index++) {

    //                var $star = angular.element(items[index]);

    //                if ($index >= index) {
                        
    //                    $star.removeClass(emptyIcon);
    //                    $star.addClass(fullIcon);
    //                    $star.addClass('active');
    //                    $star.addClass(iconHover);

    //                } else {

    //                    $star.removeClass(fullIcon);
    //                    $star.removeClass('active');
    //                    $star.removeClass(iconHover);
    //                    $star.addClass(emptyIcon);

    //                }
    //            }

    //            !hover && items.removeClass(iconHover);

    //        };

    //        scope.setValue = function (index, e) {

    //            //ignore painting
    //            if (scope.readonly) {
    //                return;
    //            }
    //            var star = e.target;

    //            if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
    //                scope.last_value = index + 1;
    //            } else {
    //                scope.last_value = index + 1;
    //            }
    //            scope.last_value_one = scope.last_value;
    //            scope.last_value_service = scope.last_value;
    //            ngModelCtrl.$setViewValue(scope.last_value);
    //            ngModelCtrl.$setViewValue(scope.last_value_one);
    //            ngModelCtrl.$setViewValue(scope.last_value_service);
    //            //console.log(scope.last_value);
    //            //return scope.last_value;
    //        };

    //    }

//});

.directive('inputStars', [function () {
    var directive = {
        restrict: 'EA',
        //replace: true,
        template: '<ul ng-class="listClass">' +
        '<li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' +
        '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
        '</li>' +
        '</ul>',
        require: 'ngModel',
        controller: 'myController',
        scope: true,
        link: link
    };

    return directive;

    function link(scope, element, attrs, ngModelCtrl) {
        var computed = {
            get readonly() {
                return attrs.readonly != 'false' && (attrs.readonly || attrs.readonly === '');
            },
            get fullIcon() {
                return attrs.iconFull || 'fa-star';
            },
            get emptyIcon() {
                return attrs.iconEmpty || 'fa-star-o';
            },
            get iconBase() {
                return attrs.iconBase || 'fa fa-fw';
            },
            get iconHover() {
                return attrs.iconHover || 'angular-input-stars-hover';
            }
        };

        scope.items = new Array(+attrs.max);
        scope.listClass = attrs.listClass || 'angular-input-stars';

        ngModelCtrl.$render = function () {
            scope.lastValue = ngModelCtrl.$viewValue || 0;
        };

        scope.getClass = function (index) {
            var icon = index >= scope.lastValue ? computed.iconBase + ' ' + computed.emptyIcon : computed.iconBase + ' ' + computed.fullIcon + ' active ';
            return computed.readonly ? icon + ' readonly' : icon;
        };

        scope.unpaintStars = function ($index, hover) {
            scope.paintStars(scope.lastValue - 1, hover);
        };

        scope.paintStars = function ($index, hover) {
            // ignore painting if readonly
            if (computed.readonly) {
                return;
            }

            var items = element.find('li').find('i');

            for (var index = 0; index < items.length; index++) {
                var $star = angular.element(items[index]);

                if ($index >= index) {
                    $star.removeClass(computed.emptyIcon);
                    $star.addClass(computed.fullIcon);
                    $star.addClass('active');
                    $star.addClass(computed.iconHover);
                } else {
                    $star.removeClass(computed.fullIcon);
                    $star.removeClass('active');
                    $star.removeClass(computed.iconHover);
                    $star.addClass(computed.emptyIcon);

                }
            }

            if (!hover) {
                items.removeClass(computed.iconHover);
            }
        };

        scope.setValue = function (index, e) {
            // ignore setting value if readonly
            if (computed.readonly) {
                return;
            }

            var star = e.target,
                newValue;

            if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
                newValue = index + 1;
            } else {
                newValue = index + 1;
            }

            // sets to 0 if the user clicks twice on the first "star"
            // the user should be allowed to give a 0 score
            if (newValue === scope.lastValue || scope.last_value || scope.last_value_one || scope.last_value_service || scope.last_value_company || scope.last_value_user_modal || scope.newCompanyName && newValue === 1) {
                newValue = 0;
            }

            scope.lastValue = newValue;
            scope.last_value = scope.lastValue;
            scope.last_value_one = scope.lastValue;
            scope.last_value_service = scope.lastValue;
            scope.last_value_company = scope.lastValue;
            scope.last_value_user_modal = scope.lastValue;
            scope.newCompanyName = scope.lastValue;
            //scope.last_value_service = scope.last_value;

            ngModelCtrl.$setViewValue(newValue);
            ngModelCtrl.$setViewValue(scope.last_value_one);
            ngModelCtrl.$setViewValue(scope.last_value_service);
            ngModelCtrl.$setViewValue(scope.last_value_company);
            ngModelCtrl.$setViewValue(scope.last_value_user_modal);
            ngModelCtrl.$setViewValue(scope.newCompanyName);
            ngModelCtrl.$render();

            //Execute custom trigger function if there is one
            if (attrs.onStarClick) {
                scope.$eval(attrs.onStarClick);
            }

        };
    }
}]);
