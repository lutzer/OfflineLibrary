define([
        'underscore',
        'backbone',
        'values/Constants'
], function(_, Backbone, Constants){

	var DocumentModel = Backbone.Model.extend({

		urlRoot : Constants['web_service_url']+"?documents",
		
		set: function(attributes, options) {
		    if (attributes.keywords !== undefined && attributes.keywords != null) {
		        attributes.keywords = attributes.keywords.split(" ");
		    }
		    
		    return Backbone.Model.prototype.set.call(this, attributes, options);
		},
		
	});

	// Return the model for the module
	return DocumentModel;

});