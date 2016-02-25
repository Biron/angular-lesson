define(function(){
	return ['$scope', '$http', function($scope, $http) {
		$scope.contacts = [{
			id: 1,
			name: "John",
			surname: "Doe"
		},{
			id: 2,
			name: "Jane",
			surname: "Loe",
			phone: 7654321
		}];

		var promise = $http.get('http://www.omdbapi.com/?s=Cat');
		console.log(promise);

		promise.then(function(response) {
			console.log(response);

			$scope.films = response.data.Search;
		});

		$scope.clickHandle = function(id) {
			console.log(id);
		};

		$scope.foo = "Foo";

		$scope.$on('formSubmit', function(event, contact) {
			var lastId = $scope.contacts[$scope.contacts.length-1].id;
			$scope.contacts.push(angular.extend({id:++lastId}, contact));
		});

	}];
});