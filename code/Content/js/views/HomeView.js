define([
	'jquery',
	'underscore',
	'marionette',
	'vent',
	'models/Database',
	'text!templates/homeTemplate.html',
], function($, _, Marionette, Vent, Database, template){
	
	var HomeView = Marionette.LayoutView.extend({
		
		initialize: function(options) {
			
			var database = Database.getInstance();
			this.collection = database.documents;
			
		},
		
		events : {

		},
		
		template : _.template(template),
		
		//childView: ExplorationListItemView,
		
		childViewContainer: '.document-list',
		
		/*emptyView: Backbone.Marionette.ItemView.extend({
			template: _.template(emptyTemplate)
		}),*/
		
	});
	// Our module now returns our view
	return HomeView;
	
});