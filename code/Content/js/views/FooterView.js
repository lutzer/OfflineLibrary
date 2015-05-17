define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'text!templates/footerTemplate.html'
], function($, _, Backbone, Marionette, Vent, Database, template){
	
	var FooterView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			this.model = Database.getInstance().settings;
		},
		
		events : {

		},
		
		template : _.template(template),
		
		onShow: function() {
			//$('#content').css('margin-bottom',$('#footer').outerHeight());
		}
	});
	
	return FooterView;
	
});