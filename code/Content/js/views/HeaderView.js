define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'text!templates/headerTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, template){
	
	var HeaderView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			this.collection = Database.getInstance().topics;
			this.settings = Database.getInstance().settings
		},
		
		collectionEvents : {
			'sync' : 'onCollectionLoaded'
		},
		
		modelEvents: {
			'sync' : 'render'
		},
		
		template : _.template(template),
		
		templateHelpers: function() {
			return {
				logo : this.settings.get('logo')
			}
		},
		
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