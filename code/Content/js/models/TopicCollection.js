define([
        'underscore',
        'backbone',
        'models/TopicModel',
        'values/Constants'
], function(_, Backbone, TopicModel, Constants){
	
	TopicCollection = Backbone.Collection.extend({
		
		model: TopicModel,

		url : Constants['web_service_url']+"?topics",
		
		getSortedTopics: function() {
			var topics = _.map(this.models,function(model) {
				return { 
					name: model.get('topic_name'),
					id: model.get('id')
				}
			})
			var sortedTopics = _.sortBy(topics,function(entry) {
				return entry.name;
			});
			
			return sortedTopics;
		}
	
	});
	
	return TopicCollection;
});