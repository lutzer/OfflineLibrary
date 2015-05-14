define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/database',
	'text!templates/headerTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, template){
	
	var HeaderView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
			var database = Database.getInstance();
			this.collection = database.topics;
			
		},
		
		events : {

		},
		
		template : _.template(template),
		
		onShow: function() {
			this.$(".button-collapse").sideNav();
			this.$(".dropdown-button").dropdown();
			$('#content').css('margin-top',$('.header-wrapper').outerHeight());
		}
	});
	
	return HeaderView;
	
});