define([
    'jquery',
	'underscore',
	'marionette'
], function($, _, Marionette){
	
	var BaseDialogView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
			//register callback
			if (options.hasOwnProperty('callback'))
				this.callback = options.callback;
			else
				this.callback = false;
		},
		
		className: 'modal-background',
		
		events: {
			'click #acceptButton' : 'onAcceptButtonPress',
			'click #rejectButton' : 'onRejectButtonPress'
		},
		
		onRender: function() {
			setTimeout(this.show,100);
		},
		
		show: function() {
			this.$('#dialog').removeClass('hidden');
			$('body').addClass('noscroll');
		},
		
		hide: function() {
			this.$('#dialog').addClass('hidden');
			$('body').removeClass('noscroll');
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
		
		onAcceptButtonPress: function(event) {
			
			event.preventDefault();
			
			if (this.callback)
				this.callback(true);
			
			this.close();
		},
		
		onRejectButtonPress: function(event) {
			
			event.preventDefault();
			
			if (this.callback)
				this.callback(false);
			
			this.close();
		}
		
	});
	return BaseDialogView;
	
});