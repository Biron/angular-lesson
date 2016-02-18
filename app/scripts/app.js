var app = angular.module('myApp', ['ngRoute', 'ngSanitize']);

app.controller('headerCtrl', ['$scope', '$rootScope', function($scope) {
	$scope.title = "Main Header";
	$scope.title2 = "Main Header2";
}]);

app.controller('page1Ctrl', ['$scope', function($scope) {
	$scope.contacts = [{
		id: 1,
		firstName: "<em>John</em>",
		lastName: "Doe"
	},{
		id: 2,
		firstName: "Jane",
		lastName: "Loe",
		phoneNumber: 7654321
	}]

	$scope.clickHandle = function(id) {
		console.log(id);
	};

	$scope.foo = "Foo";

}]);

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
});

