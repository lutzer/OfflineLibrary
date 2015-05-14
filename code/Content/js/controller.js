define([
        'jquery',
        'marionette',
        'vent',
        'views/DocumentListView',
        'views/HeaderView',
        'views/FooterView'
], function($, Marionette, Vent, DocumentListView, HeaderView, FooterView){
	
	var Controller = Marionette.Controller.extend({
		
		initialize: function(app) {
			this.app = app;
			
			app.addRegions({
				headerRegion: "#header",
				contentRegion: "#content",
				footerRegion: "#footer",
				modalRegion: "#modal-container"
			});
			
			this.headerView = new HeaderView();
			this.footerView = new FooterView();
			
			this.app.headerRegion.show(this.headerView);
			this.app.footerRegion.show(this.footerView);
		},
		
			
		/* ROUTES */
		
		document: function(id) {
			//this.app.contentRegion.show(new DocumentView(id));
		},
	
		defaultRoute: function() {
			this.app.contentRegion.show(new DocumentListView())
		},
		
	});
	
	return Controller;
});