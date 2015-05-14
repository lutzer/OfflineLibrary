define([
        'underscore',
        'backbone',
        'values/Constants'
], function(_, Backbone, Constants){

	var TopicModel = Backbone.Model.extend({

		urlRoot : Constants['web_service_url']+"?topics",
		
	});

	// Return the model for the module
	return TopicModel;

});