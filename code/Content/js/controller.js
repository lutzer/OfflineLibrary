define([
        'jquery',
        'marionette',
        'vent',
        'views/DocumentView',
        'views/DocumentListView',
        'views/UploadView',
        'views/HeaderView',
        'views/FooterView'
], function($, Marionette, Vent, DocumentView, DocumentListView, UploadView, HeaderView, FooterView){
	
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
			this.app.contentRegion.show(new DocumentView({id: id}));
		},
		
		upload: function() {
			this.app.contentRegion.show(new UploadView());
		},
	
		defaultRoute: function() {
			this.app.contentRegion.show(new DocumentListView());
		},
		
	});
	
	return Controller;
});