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
		
		events: {
			'click #searchButton' : 'openSearchBar',
			'keydown input' : 'onSearchBarKeyPressed',
			'click .mdi-navigation-close' : 'closeSearchBar'
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
		},
		
		openSearchBar: function(event) {
			event.preventDefault();
			
			this.$('#searchInput').show();
			this.$('#navContent').hide();
			
			this.$('#searchInput input').focus();
		},
		
		closeSearchBar: function(event) {
			event.preventDefault();
			
			this.$('#searchInput').hide();
			this.$('#navContent').show();
		},
		
		onSearchBarKeyPressed: function(event) {
			
			// on enter press
			if (event.keyCode == 13) {
				this.$('#searchInput input').blur();
				
				var searchString = this.$('#searchInput input').val();
				window.location.hash = "#search/"+encodeURIComponent(searchString);
			}
		}
	});
	
	return HeaderView;
	
});