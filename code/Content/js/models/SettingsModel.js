define([
        'underscore',
        'backbone',
        'values/Constants'
], function(_, Backbone, Constants){

	var SettingsModel = Backbone.Model.extend({

		url : Constants['web_service_url']+"?settings",
		
		defaults: {
			about_text: '-',
			footer_text: 'Powered by OfflineLibrary',
			logo: 'images/logo.png',
			header_color: 0,
			content_color: 0
		}
		
		
	});

	// Return the model for the module
	return SettingsModel;

});