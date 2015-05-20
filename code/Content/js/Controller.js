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
        'views/settings/SettingsView',
        'views/dialogs/ModalDialogView'
], function($, Marionette, Vent, StyleSetter, Database, DocumentView, DocumentListView, UploadView, AboutView, IndexView, HeaderView, FooterView, SettingsView, ModalDialogView){
	
	var Controller = Marionette.Controller.extend({
		
		initialize: function(app) {
			this.app = app;
			
			app.addRegions({
				headerRegion: "#header",
				contentRegion: "#content",
				footerRegion: "#footer",
				settingsRegion: "#settings",
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
			Vent.on('dialog:close', this.closeDialog, this);
			
			Vent.on('settings:open', this.toggleSettings, this);
	
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
		},
		
		closeDialog: function() {
			if (this.app.modalRegion.hasView())
				this.app.modalRegion.reset();
		},
		
		/* SETTINGS */
		
		toggleSettings: function() {
			
			if (this.app.settingsRegion.hasView()) {
				this.app.settingsRegion.reset();
				return;
			}
				
			//login
			var settings = Database.getInstance().settings;
			var self = this;
			
			settings.login({
				success: function() {
					self.app.settingsRegion.show(new SettingsView())
					$('body').scrollTop($('#settings').position().top);
				},
				error: function() {
					Vent.trigger('dialog:open', {
						title: "No login", 
						text: "Could not login. Wrong password or username supplied.", 
						type: 'message'
					});
				}
			});
			
		},
		
	});
	
	return Controller;
});