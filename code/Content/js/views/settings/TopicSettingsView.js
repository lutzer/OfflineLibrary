define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'models/TopicModel',
	'views/settings/TopicSettingsItemView',
	'text!templates/settings/topicSettingsTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, TopicModel, TopicSettingsItemView, template){
	
	var TopicSettingsView = Marionette.CompositeView.extend({
		
		initialize: function(options) {
			this.collection = Database.getInstance().topics;
		},
		
		events : {
			'click #addTopic' : 'onAddTopicButtonClicked'
		},
		
		template: _.template(template),
		
		childView: TopicSettingsItemView,
		
		childViewContainer: "#settings-list",
		
		onAddTopicButtonClicked: function(event) {
			
			event.preventDefault();
			this.collection.add(new TopicModel());
		}
	});
	
	return TopicSettingsView;
	
});