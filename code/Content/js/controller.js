define([
        'jquery',
        'marionette',
        'vent',
        'views/HomeView'
], function($, Marionette, Vent, HomeView){
	
	var Controller = Marionette.Controller.extend({
		
		initialize: function(app) {
			this.app = app;
			
			app.addRegions({
				containerRegion: "#container",
				modalRegion: "#modal-container"
			});
		},
		
			
		/* ROUTES */
		
		document: function(id) {
			this.homeView.showRecording(id);
		},
	
		defaultRoute: function() {
			this.app.containerRegion.show(new HomeView())
		},
		
	});
	
	return Controller;
});