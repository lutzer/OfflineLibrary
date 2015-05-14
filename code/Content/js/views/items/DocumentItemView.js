define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'text!templates/items/documentItemTemplate.html',
], function($, _, Backbone, Marionette, Vent, template){
	
	var DocumentItemView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
		},
		
		events : {

		},
		
		template : _.template(template)
	});
	return DocumentItemView;
	
});