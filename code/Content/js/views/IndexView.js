define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'text!templates/indexTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, template){
	
	var IndexView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			var database = Database.getInstance();
			this.documents = database.documents;
			this.topics = database.topics;
			
			this.documents.on('sync',this.render);
			this.topics.on('sync',this.render);
		},
		
		events : {
			'click .card-top' : 'onToggleCollapseIndex'
		},
		
		template : _.template(template),
		
		templateHelpers: function() {
			return {
				authors : this.documents.getAuthors(),
				titles: this.documents.getTitles(),
				keywords: this.documents.getKeywords(),
				published: this.documents.getPublished(),
				topics: this.topics.getSortedTopics()
			}
		},
		
		onToggleCollapseIndex : function(event) {
			var collapseId = "#"+event.currentTarget.dataset.collapse;
			
			this.$(collapseId).slideToggle();
		}
	});
	
	return IndexView;
	
});