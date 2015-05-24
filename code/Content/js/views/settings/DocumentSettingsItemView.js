define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'text!templates/settings/documentSettingsItemTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, template){
	
	var DocumentSettingsItemView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
		},
		
		events : {
			'click #deleteButton' : 'onDeleteButtonClicked'
		},
		
		template : _.template(template),
		
		tagName: "li",
		
		onDeleteButtonClicked: function(event) {
			
			event.preventDefault();
			
			this.model.destroy();
			Database.getInstance().sync();
		}
	});
	
	return DocumentSettingsItemView;
	
});