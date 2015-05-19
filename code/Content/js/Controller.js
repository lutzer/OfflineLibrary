define([
        'jquery',
        'marionette',
        'vent',
    	'StyleSetter',
    	'models/Database',
        'views/DocumentView',
        'views/DocumentListView',
        'views/UploadView',
        'views/AboutView',
        'views/IndexView',
        'views/HeaderView',
        'views/FooterView',
        'views/dialogs/ModalDialogView'
], function($, Marionette, Vent, StyleSetter, Database, DocumentView, DocumentListView, UploadView, AboutView, IndexView, HeaderView, FooterView, ModalDialogView){
	
	var Controller = Marionette.Controller.extend({
		
		initialize: function(app) {
			this.app = app;
			
			app.addRegions({
				headerRegion: "#header",
				contentRegion: "#content",
				footerRegion: "#footer",
				modalRegion: "#modal-container"
			});

			//load setting and apply css styles
			var settings = Database.getInstance().settings;
			settings.on('sync',StyleSetter.apply);

			this.headerView = new HeaderView();
			this.footerView = new FooterView();
			
			this.app.headerRegion.show(this.headerView);
			this.app.footerRegion.show(this.footerView);
			
			//register events
			Vent.on('dialog:open', this.openDialog, this);
	
		},
		
			
		/* ROUTES */
		
		document: function(id) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentView({id: id}));
		},
		
		upload: function() {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new UploadView());
		},
		
		about: function() {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new AboutView());
		},
		
		topic: function(id) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView({collectionFilter : { topic_id : id}}));
		},
		
		keyword: function(keyword) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView({collectionFilter : { keywords : keyword}}));
		},
		
		year: function(year) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView({collectionFilter : { published : year}}));
		},
		
		author: function(author) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView({collectionFilter : { author : author}}));
		},
		
		index: function() {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new IndexView());
		},
	
		defaultRoute: function() {
			this.app.contentRegion.show(new DocumentListView());
		},
		
		/* DIALOGS */
		
		openDialog: function(options) {
			this.app.modalRegion.show(new ModalDialogView(options));
		}
		
	});
	
	return Controller;
});