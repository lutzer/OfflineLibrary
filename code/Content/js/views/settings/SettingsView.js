define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'views/settings/TopicSettingsView',
	'text!templates/settings/settingsTemplate.html',
], function($, _, Backbone, Marionette, Vent, TopicSettingsView, template){
	
	var SettingsView = Marionette.LayoutView.extend({
		
		initialize: function(options) {
			
		},
		
		events : {
			'click .list-link' : 'onListLinkClicked'
		},
		
		template : _.template(template),
		
		regions : {
			subpage: "#settings-subpage",
		},
		
		onShow : function() {
			this.getRegion('subpage').show(new TopicSettingsView());
		},
		
		onListLinkClicked: function(event) {
			
			var page = event.currentTarget.dataset.page
			if ( page == 'topics')
				this.getRegion('subpage').show(new TopicSettingsView());
		}
		
	});
	
	return SettingsView;
	
});