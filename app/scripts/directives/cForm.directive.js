define(function() {
	return function() {
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
	}
});