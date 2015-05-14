define([
	'jquery',
	'underscore',
	'marionette',
	'vent',
	'models/Database',
	'views/items/DocumentItemView'
], function($, _, Marionette, Vent, Database, DocumentItemView){
	
	var DocumentListView = Marionette.CollectionView.extend({
		
		initialize: function(options) {
			
			var database = Database.getInstance();
			this.collection = database.documents;
			
		},
		
		events : {

		},
		
		childView: DocumentItemView,
		
		className: 'row'
		
		/*emptyView: Backbone.Marionette.ItemView.extend({
			template: _.template(emptyTemplate)
		}),*/
		
	});
	
	return DocumentListView;
	
});