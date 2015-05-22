define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'views/settings/DocumentSettingsItemView',
	'text!templates/settings/documentSettingsTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, DocumentSettingsItemView, template){
	
	var DocumentSettingsView = Marionette.CompositeView.extend({
		
		initialize: function(options) {
			this.collection = Database.getInstance().documents;
		},
		
		
		template: _.template(template),
		
		childView: DocumentSettingsItemView,
		
		childViewContainer: "#settings-list"
	});
	
	return DocumentSettingsView;
	
});