define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'Controller'
], function($, _, Backbone, Marionette, Controller) {
	
	var App = new Backbone.Marionette.Application();

	var initialize = function(){
		
		App.addInitializer(function(options){
			  Backbone.history.start();
			  
			  // support cross origin sharing
			  $.support.cors=true;
			  
		});
		
		App.Router = new Marionette.AppRouter({
			controller: new Controller(App),
			appRoutes: {
				'document/:id': 'document',
				'upload': 'upload',
				'about' : 'about',
				'topic/:id' : 'topic',
				'keyword/:keywoard' : 'keyword',
				'year/:year' : 'year',
				'author/:author' : 'author',
				'index' : 'index',
				'settings' : 'settings',
				'*actions': 'defaultRoute'
			}
		});
		
		App.start();
		
	};

	return {
		initialize: initialize,
	};
	
});