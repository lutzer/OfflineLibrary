define([
        'jquery',
        'marionette',
        'vent',
        'views/DocumentView',
        'views/DocumentListView',
        'views/UploadView',
        'views/AboutView',
        'views/HeaderView',
        'views/FooterView',
        'views/dialogs/ModalDialogView',
        'models/Database'
], function($, Marionette, Vent, DocumentView, DocumentListView, UploadView, AboutView, HeaderView, FooterView, ModalDialogView){
	
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
			
			//register events
			Vent.on('dialog:open', this.openDialog, this);
		},
		
			
		/* ROUTES */
		
		document: function(id) {
			this.app.contentRegion.show(new DocumentView({id: id}));
		},
		
		upload: function() {
			this.app.contentRegion.show(new UploadView());
		},
		
		about: function() {
			this.app.contentRegion.show(new AboutView());
		},
		
		topic: function(id) {
			this.app.contentRegion.show(new DocumentListView({collectionFilter : { topic_id : id}}));
		},
		
		keyword: function(keyword) {
			this.app.contentRegion.show(new DocumentListView({collectionFilter : { keywords : keyword}}));
		},
	
		defaultRoute: function() {
			this.app.contentRegion.show(new DocumentListView());
		},
		
		/* DIALOGS */
		
		openDialog: function(options) {
			this.app.modalRegion.show(new ModalDialogView(options));
		},
		
	});
	
	return Controller;
});