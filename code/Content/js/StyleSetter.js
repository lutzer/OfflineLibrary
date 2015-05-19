define([
	'jquery',
	'values/Colors'
], function($, Colors){
	
	var StyleSetter = _.extend(Object,{
		
		apply: function(settings) {
			
			
			// set header button and hover colors
			jss.set('#header .color-main', {
			    'background-color' : Colors[settings.get('header_color')].bgColor
			});
			jss.set('#header .side-nav li:hover', {
				'background-color' : Colors[settings.get('header_color')].hoverColor
			});
			jss.set('.btn', {
				'background-color' : Colors[settings.get('header_color')].bgColor
			});
			jss.set('.btn:hover', {
				'background-color' : Colors[settings.get('header_color')].hoverColor
			});
		},
		
	});
	
	return StyleSetter;
	
});