define([
        'underscore',
        'backbone',
        'models/TopicModel',
        'values/Constants'
], function(_, Backbone, TopicModel, Constants){
	
	TopicCollection = Backbone.Collection.extend({
		
		model: TopicModel,

		url : Constants['web_service_url']+"?topics",
	
	});
	
	return TopicCollection;
});