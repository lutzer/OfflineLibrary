define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'models/Database',
	'text!templates/settings/pageSettingsTemplate.html',
], function($, _, Backbone, Marionette, Vent, Database, template){
	
	var View = Marionette.ItemView.extend({
		
		initialize: function(options) {
			this.model = Database.getInstance().settings;
		},
		
		events : {
			'click #saveSettings' : 'onSaveButtonClicked',
			'click #colorButton' : 'onColorButtonClicked',
			'click #changePassword' : 'onChangePasswordClicked'
		},
		
		modelEvents: {
			'change' : 'render'
		},
		
		template : _.template(template),
		
		onSaveButtonClicked: function(event) {
			
			event.preventDefault();
			
			this.model.set({
				footer_text: this.$('#footer_text').val(),
				about_text: this.$('#about_text').val()
			});
			this.model.save();
			Database.getInstance().sync();
		},
		
		onColorButtonClicked: function(event) {
			
			event.preventDefault();
			
			var self = this;
			Vent.trigger('dialog:colorpicker', {
				callback: function(result) {
					if (result) {
						self.model.set({header_color : result});
					}
						
				}
			});
		},
		
		onChangePasswordClicked: function(event) {
			
			event.preventDefault();
			
			var password = this.$('#admin_password').val().trim();
			
			if (password.length < 4) {
				Vent.trigger('dialog:open', {
					type: 'message',
					title: 'Change Password',
					text: 'The password has to be at least 4 characters long'
				});
			} else {
				this.model.setPassword(password,{
					success: function() {
						Vent.trigger('dialog:open', {
							type: 'message',
							title: 'Change Password',
							text: 'Password has been changed. Use it next time you login.'
						});
					}
				});
			}
		}
	});
	
	return View;
	
});