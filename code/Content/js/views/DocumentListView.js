define([
	'jquery',
	'underscore',
	'marionette',
	'vent',
	'models/Database',
	'models/DocumentCollection',
	'views/items/DocumentItemView',
	'text!templates/documentListTemplate.html'
], function($, _, Marionette, Vent, Database, DocumentCollection, DocumentItemView ,template){
	
	var DocumentListView = Marionette.CompositeView.extend({
		
		initialize: function(options) {
			
			var database = Database.getInstance();
			if (this.options.searchString !== undefined) {
				this.collection = new DocumentCollection();
				this.collection.search(options.searchString);
			} else {
				this.collection = database.documents;
			}
			
			
			if (this.options.collectionFilter !== undefined) {
				var field = _.keys(this.options.collectionFilter)[0];
				var value = _.values(this.options.collectionFilter)[0];
			}
		
		},
		
		template: _.template(template),
		
		templateHelpers: function() {
			return {
				filterName : this.options.filterName,
				searchString : this.options.searchString
			}
		},
		
		childView: DocumentItemView,
		
		childViewContainer: "#document-list",
		
		className: 'row',
		
		// filter collection
		filter: function (child, index, collection) {
			if (this.options.collectionFilter !== undefined) {
				var field = _.keys(this.options.collectionFilter)[0];
				var value = _.values(this.options.collectionFilter)[0];
				return child.matches(field,value);
			}
			return true;
	    }
		
	});
	
	return DocumentListView;
	
});