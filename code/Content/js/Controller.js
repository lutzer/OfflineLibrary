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
        'views/dialogs/ModalDialogView',
        'views/dialogs/ColorPickerDialogView'
], function($, Marionette, Vent, StyleSetter, Database, DocumentView, DocumentListView, UploadView, AboutView, IndexView, HeaderView, FooterView, SettingsView, ModalDialogView, ColorPickerDialogView){
	
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
			
			Vent.on('dialog:colorpicker', this.openColorPickerDialog, this);
	
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
		
		topic: function(topic) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView({
				collectionFilter : { topic_name : topic}, 
				filterName: 'collection: '+ topic
			}));
		},
		
		keyword: function(keyword) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView(
				{collectionFilter : { keywords : keyword}, 
				filterName: 'keyword: '+keyword
			}));
		},
		
		year: function(year) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView({
				collectionFilter : { published : year},
				filterName: 'year: '+year
			}));
		},
		
		author: function(author) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView({
				collectionFilter : { author : author},
				filterName: 'author: '+author
			}));
		},
		
		index: function() {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new IndexView());
		},
		
		search: function(searchString) {
			$('body').scrollTop(0);
			this.app.contentRegion.show(new DocumentListView({searchString : searchString}));
		},
		
		settings: function() {
			
			var settings = Database.getInstance().settings;
			
			//try to login
			var self = this;
			settings.login({
				success: function() {
					$('body').scrollTop(0);
					self.app.contentRegion.show(new SettingsView());
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
		
		openColorPickerDialog: function(options) {
			this.app.modalRegion.show(new ColorPickerDialogView(options));
		},
		
	});
	
	return Controller;
});