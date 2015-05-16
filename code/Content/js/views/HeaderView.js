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
		
		collectionEvents : {
			'sync' : 'onCollectionLoaded'
		},
		
		template : _.template(template),
		
		onShow: function() {
			
			//change content margins to fit under header
			$('#content').css('margin-top',$('.header-wrapper').outerHeight());
		},
		
		onCollectionLoaded: function() {
			
			this.render();
			
			this.$('.button-collapse').sideNav({
			      menuWidth: 200,
			      edge: 'left',
			      closeOnClick: true
			});
			
			this.$(".dropdown-button").dropdown({
				constrain_width: false
			});
		}
	});
	
	return HeaderView;
	
});