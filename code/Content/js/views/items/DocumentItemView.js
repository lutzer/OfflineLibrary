define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'string',
	'vent',
	'text!templates/items/documentItemTemplate.html',
], function($, _, Backbone, Marionette, String, Vent, template){
	
	var DocumentItemView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
		},
		
		events : {
		},
		
		modelEvents: {
			'change' : 'render'
		},
		
		template : _.template(template),
		
		templateHelpers: function() {
			return {
				description_short : String.truncate(this.model.get('description'),200)
			}
		},
		
		onShow: function() {
			
			// float keywords
			var containerWidth = this.$('.keywords ul').width();
			
			this.$('.keywords .link').each(function() {
				var elementWidth = $(this).width();
				$(this).css('margin-left',Math.random()*(containerWidth - elementWidth)+'px');
			});
		}
	});
	return DocumentItemView;
	
});