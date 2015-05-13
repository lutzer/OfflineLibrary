define([
        'underscore',
        'backbone',
        'models/DocumentModel',
        'values/Constants'
], function(_, Backbone, DocumentModel, Constants){
	
	DocumentCollection = Backbone.Collection.extend({
		
		model: DocumentModel,

		url : Constants['web_service_url'],
	
	});
	
	return DocumentCollection;
});