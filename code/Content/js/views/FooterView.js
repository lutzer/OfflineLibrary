define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'text!templates/footerTemplate.html',
], function($, _, Backbone, Marionette, Vent, template){
	
	var FooterView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
		},
		
		events : {

		},
		
		template : _.template(template),
		
		onShow: function() {
			$('#content').css('margin-bottom',$('#footer').outerHeight());
		}
	});
	
	return FooterView;
	
});