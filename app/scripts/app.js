define(function( require, exports, module ) {
	require('angular');
	require('angularRoute');

	var app = angular.module('myApp', [
		'ngRoute'
	]);

	app.controller('headerCtrl', ['$scope', '$rootScope', function($scope) {
		$scope.title = "Main Header";
		$scope.title2 = "Main Header2";
	}]);

	app.controller('page1Ctrl', require('./controllers/page1.ctrl'));

	app.directive('myContact', function() {
		return {
			restrict: 'AE',
			scope: {
				contact: "=myC",
				title: "@",
				click: "&"
			},
			templateUrl: 'scripts/templates/my-contact.directive.tmpl.html',
			link: function(scope, elem, attr) {
				console.log(scope);
				scope.foo = "Not foo";
			}
		}
	});

	app.directive('phone', function() {
		return {
			restrict: 'A',
			require: '^ngModel',
			link: function(scope, elem, attr, ctrl) {
				console.log(ctrl);
				var reg = /^\d{7,13}$/

				function validator(val) {
					if(reg.test(val)) {
						ctrl.$setValidity('phone', true)
						return val;
					} else {
						ctrl.$setValidity('phone', false)
						return undefined;
					}
				}

				ctrl.$formatters.push(validator);
				ctrl.$parsers.push(validator);

			}
		}
	});

	app.directive('myForm', require('./directives/cForm.directive'));

	app.controller('page2Ctrl', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.pageTitle = "Page 2";
	}]);

	app.filter('empty', function() {
		return function(value) {
			return value || "<no value>";
		};
	})

	app.config(function($routeProvider) {
		$routeProvider
			.when("/page1", {
				templateUrl: "scripts/templates/page1.html",
				controller: 'page1Ctrl'
			})
			.when("/page2", {
				templateUrl: "scripts/templates/page2.html",
				controller: 'page2Ctrl'
			})
			.when("/page2/:id", {
				templateUrl: "scripts/templates/page2.html",
				controller: 'page2Ctrl'
			})
			.otherwise({redirectTo : "/page1"});
	});/**/

	angular.element(document.documentElement).ready(function () {
        angular.bootstrap(document, [app.name]);
    });

    return app;
	
});