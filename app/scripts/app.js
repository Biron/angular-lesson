var app = angular.module('myApp', ['ngRoute', 'ngSanitize']);

app.controller('headerCtrl', ['$scope', '$rootScope', function($scope) {
	$scope.title = "Main Header";
	$scope.title2 = "Main Header2";
}]);

app.controller('page1Ctrl', ['$scope', function($scope) {
	$scope.contacts = [{
		id: 1,
		name: "<em>John</em>",
		surname: "Doe"
	},{
		id: 2,
		name: "Jane",
		surname: "Loe",
		phone: 7654321
	}];

	$scope.clickHandle = function(id) {
		console.log(id);
	};

	$scope.foo = "Foo";

	$scope.$on('formSubmit', function(event, contact) {
		var lastId = $scope.contacts[$scope.contacts.length-1].id;
		$scope.contacts.push(angular.extend({id:++lastId}, contact));
	});

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

app.directive('myForm', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'scripts/templates/contact-form.directive.tmpl.html',
		link: function(scope, elem, attr) {
			scope.newContact = {};
			scope.buttonClicked = false;
			scope.submitForm = function(form) {
				scope.buttonClicked = true;
				if(form.$invalid) {
					return false;
				}

				scope.$emit('formSubmit', scope.newContact);
			};

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

