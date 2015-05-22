define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'views/settings/TopicSettingsView',
	'views/settings/DocumentSettingsView',
	'views/settings/PageSettingsView',
	'text!templates/settings/settingsTemplate.html',
], function($, _, Backbone, Marionette, Vent, TopicSettingsView, DocumentSettingsView, PageSettingsView, template){
	
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
			
			event.preventDefault();
			
			var page = event.currentTarget.dataset.page
			if (page == 'topics')
				this.getRegion('subpage').show(new TopicSettingsView());
			else if (page == 'documents')
				this.getRegion('subpage').show(new DocumentSettingsView());
			else if (page == 'page')
				this.getRegion('subpage').show(new PageSettingsView());
		}
		
	});
	
	return SettingsView;
	
});