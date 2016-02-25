requirejs.config({
	baseUrl: "./js",
	paths: {
		'angular': "vendors/angular/angular.min",
		'angularRoute': "vendors/angular-route/angular-route.min",
		'app': 'app'
	},
	shim: {
		'angular': {
            deps: [],
			exports: 'angular'
		},
        'angularRoute': ['angular'],
		'app' : ['angular']
	},


	deps: ['app']
});