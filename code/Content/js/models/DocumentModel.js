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
			entry_type: false,
			topic_name: false,
			topic_id: null,
			topic_color: 0,
			file: ''
			
		},
		
		/*
		 * matches an attribute with the value, returns true if match exists
		 */
		matches: function(attribute,value) {
			if (attribute == 'keywords') {
				var keywords = this.get('keywords').split(',');
				keywords = _.map(keywords, function(string) {
					return string.trim().toLowerCase();
				});
				return _.contains(keywords, value); 
			} else if (attribute == 'author') {
				var authors = this.get('author').split(';');
				authors = _.map(authors, function(string) {
					return string.trim().toLowerCase();
				});
				return _.contains(authors, value);
			} else {
				return this.get(attribute) == value;
			}
		}		
	});

	// Return the model for the module
	return DocumentModel;

});