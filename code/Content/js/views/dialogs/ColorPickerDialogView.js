define([
    'jquery',
	'underscore',
	'marionette',
	'values/Colors',
	'text!templates/dialogs/dialogColorPickerTemplate.html',
], function($, _, Marionette, Colors, template){
	
	var ColorPickerDialogView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
			//register callback
			if (options.hasOwnProperty('callback'))
				this.callback = options.callback;
			else
				this.callback = false;
		},
		
		template: _.template(template),
		
		templateHelpers: function() {
			return {
				colors: Colors
			}
		},
		
		className: 'modal-background',
		
		events: {
			'click .color-picker' : 'onColorPickerClicked',
			'click #rejectButton' : 'onRejectButtonPress'
		},
		
		onRender: function() {
			setTimeout(this.show,100);
		},
		
		show: function() {
			this.$('#dialog').removeClass('hidden');
		},
		
		hide: function() {
			this.$('#dialog').addClass('hidden');
		},
		
		close: function() {
			if (this.$('#dialog').hasClass('hidden'))
				this.destroy();
			else {
				this.hide();
				//register transition end
				var self = this;
				this.$('#dialog').on("webkitTransitionEnd transitionend", function(event) {
					if (event.target.id != 'dialog')
						return;
					
					//unbind all events & destroy view
					self.$el.unbind();
					self.destroy();
				});
			}
		},
		
		onRejectButtonPress: function() {
			
			event.preventDefault();
			
			if (this.callback)
				this.callback(false);
			
			this.close();
		},
		
		onColorPickerClicked: function(event) {
			
			event.preventDefault();
			
			var colorId = event.currentTarget.dataset.color;
			
			if (this.callback)
				this.callback(colorId);
			
			this.close();
		}
		
	});
	return ColorPickerDialogView;
	
});