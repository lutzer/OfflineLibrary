define([
        'underscore',
        'backbone',
        'values/Constants'
], function(_, Backbone, Constants){

	var TopicModel = Backbone.Model.extend({

		urlRoot : Constants['web_service_url']+"?topics",
		
		defaults : {
			topic_name: '',
			topic_color: 0
		}
		
	});

	// Return the model for the module
	return TopicModel;

});