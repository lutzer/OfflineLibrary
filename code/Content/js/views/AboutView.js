define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'text!templates/aboutTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, template){
	
	var View = Marionette.ItemView.extend({
		
		initialize: function(options) {
			this.model = Database.getInstance().settings;
		},
		
		modelEvents : {
			'sync' : 'render'
		},
		
		template : _.template(template)
	});
	
	return View;
	
});