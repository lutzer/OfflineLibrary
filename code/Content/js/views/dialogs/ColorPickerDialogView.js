define([
    'jquery',
	'underscore',
	'views/dialogs/BaseDialogView',
	'values/Colors',
	'text!templates/dialogs/dialogColorPickerTemplate.html',
], function($, _, BaseDialogView, Colors, template){
	
	var ColorPickerDialogView = BaseDialogView.extend({
		
		template: _.template(template),
		
		templateHelpers: function() {
			return {
				colors: Colors
			}
		},
		
		events: {
			'click .color-picker' : 'onColorPickerClicked',
			'click #rejectButton' : 'onRejectButtonPress'
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