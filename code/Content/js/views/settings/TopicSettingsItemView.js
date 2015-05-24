define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'text!templates/settings/topicSettingsItemTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, template){
	
	var TopicSettingsItemView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
		},
		
		events : {
			'click #deleteButton' : 'onDeleteButtonClicked',
			'click #colorButton' : 'onColorButtonClicked',
			'keydown input' : 'onInputFieldKeyPressed',
			'focusout input' : 'onInputFocusOut'
		},
		
		modelEvents: {
			'change' : 'render'
		},
		
		template : _.template(template),
		
		tagName: "li",
		
		onDeleteButtonClicked: function(event) {
			
			event.preventDefault();
			
			this.model.destroy();
			Database.getInstance().sync();
		},
		
		onColorButtonClicked: function(event) {
			
			event.preventDefault();
			
			// choose color with color picker dialog
			var self = this;
			Vent.trigger('dialog:colorpicker', {
				callback: function(result) {
					if (result) {
						self.model.set({topic_color : result});
						self.model.save();
						Database.getInstance().sync();
					}
				}
			});
		},
		
		onInputFieldKeyPressed: function(event) {
			
			// on enter press
			if (event.keyCode == 13) {
				this.model.set({topic_name : this.$('#topic_name').val()});
				this.model.save();
				Database.getInstance().sync();
			}
		},
		
		onInputFocusOut: function() {
			//revert text if not saved
			this.$('#topic_name').val(this.model.get('topic_name'));
		} 
	});
	
	return TopicSettingsItemView;
	
});