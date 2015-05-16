define([
    'jquery',
	'underscore',
	'marionette',
	'text!templates/dialogs/dialogMessageTemplate.html'
], function($, _, Marionette, messageTemplate){
	
	var ModalDialogView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			
			//register callback
			if (options.hasOwnProperty('callback'))
				this.callback = options.callback;
			else
				this.callback = false;
		},
		
		serializeData: function(){
		    return {
				title : this.options.title,
				text : this.options.text
		    };
		},
		
		getTemplate: function(){
			if (this.options.type == 'message')
				return _.template(messageTemplate);
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
		
		done: function(msg) {
			this.$('#done').html(msg);
			this.setProgress(100);
		},
		
		setProgress: function(val) {
			if (!this.$('#progressBar > div').hasClass("determinate")) {
				this.$('#progressBar > div').removeClass("indeterminate");
				this.$('#progressBar > div').addClass("determinate");
			}
			this.$('#progressBar > div').width(val+"%");
		},
		
		onAcceptButtonPress: function() {
			if (this.callback)
				this.callback(true);
			
			this.close();
		},
		
		onRejectButtonPress: function() {
			if (this.callback)
				this.callback(false);
			
			this.close();
		}
		
	});
	return ModalDialogView;
	
});