define([
        'underscore',
        'backbone',
        'values/Constants'
], function(_, Backbone, Constants){

	var DocumentModel = Backbone.Model.extend({

		urlRoot : Constants['web_service_url']+"?documents",
		
		defaults: {
			title: false,
			author: false,
			description: false,
			keywords: '',
			published: false,
			isbn: false,
			language: false,
			topic_name: false,
			topic_id: null,
			file: ''
			
		},
		
		/*
		 * matches an attribute with the value, returns true if match exists
		 */
		matches: function(attribute,value) {
			if (attribute == 'keywords') {
				return _.contains(this.get('keywords').split(" "), value) 
			} else {
				return this.get(attribute) == value;
			}
		}		
	});

	// Return the model for the module
	return DocumentModel;

});