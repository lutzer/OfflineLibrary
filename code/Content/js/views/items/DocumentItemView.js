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
		
		className: 'column-item',
		
		events : {
			
		},
		
		modelEvents: {
			'change' : 'render'
		},
		
		template : _.template(template),
		
		templateHelpers: function() {
			return {
				description_short : String.truncate(this.model.get('description'),150),
				format: this.model.get('file').split('.').pop()
			}
		},
		
		onShow: function() {
			
			// float keywords
			var containerWidth = this.$('.keywords ul').width();
			
			this.$('.keywords .link').each(function() {
				var elementWidth = $(this).width();
				$(this).css('margin-left',Math.random()*(1 - elementWidth/containerWidth)*100+'%');
			});
		}
	});
	return DocumentItemView;
	
});