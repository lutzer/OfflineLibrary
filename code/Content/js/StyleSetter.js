define([
	'jquery',
	'libs/jss.min',
	'values/Colors'
], function($, Jss, Colors){
	
	var StyleSetter = _.extend(Object,{
		
		
		
		apply: function(settings) {
			
			// set header button and hover colors
			Jss.set('.color-main', {
			    'background-color' : Colors[settings.get('header_color')].bgColor
			});
			Jss.set('#header .side-nav li:hover', {
				'background-color' : Colors[settings.get('header_color')].hoverColor
			});
			Jss.set('.btn', {
				'background-color' : Colors[settings.get('header_color')].bgColor
			});
			Jss.set('.btn:hover', {
				'background-color' : Colors[settings.get('header_color')].hoverColor
			});
			
			//set page logo
			$('#pageLogo').attr("src", settings.get('logo'));
		},
		
	});
	
	return StyleSetter;
	
});