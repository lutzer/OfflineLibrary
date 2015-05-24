define([
        'underscore',
        'backbone',
        'values/Constants'
], function(_, Backbone, Constants){

	var SettingsModel = Backbone.Model.extend({

		url : Constants['web_service_url']+"?settings",
		
		defaults: {
			about_text: '',
			footer_text: '',
			logo: 'images/logo.png',
			header_color: 0,
			content_color: 0
		},
		
		// login to make changes on the settings
		login: function(options) {
			
			options = _.extend(options, { type: 'GET' });
			$.ajax(Constants['web_service_url']+"?login", options);	
		},
		
		setPassword: function(password, options) {
			
			options = _.extend(options, { 
				type: 'POST',
				data: {password: password}
			});
			
			$.ajax(Constants['web_service_url']+"?password", options);	
		}
		
		
	});

	// Return the model for the module
	return SettingsModel;

});