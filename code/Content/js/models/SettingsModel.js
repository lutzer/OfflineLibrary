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
			logo: 'images/logo.png'
			
		}
		
		
	});

	// Return the model for the module
	return SettingsModel;

});