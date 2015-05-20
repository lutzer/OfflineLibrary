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
		
		modelEvents : {
			'sync' : 'render'
		},
		
		events: {
			'click #settingsButton' : 'onClickSettingsButton'
		},
		
		template : _.template(template),
		
		onShow: function() {
			//$('#content').css('margin-bottom',$('#footer').outerHeight());
		},
		
		onClickSettingsButton: function(event) {
			
			if(event) 
				event.preventDefault();
			
			Vent.trigger('settings:open');
		}
	});
	
	return FooterView;
	
});