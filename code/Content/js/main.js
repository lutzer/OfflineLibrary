require.config({
	baseUrl: "js",
	paths: {
		backbone: 'libs/backbone-min',
		underscore: 'libs/underscore-min',
		marionette: 'libs/backbone.marionette.min',
		text: 'libs/plugins/text',
		string: 'libs/underscore.string.min',
		iframeTransport : 'libs/jquery.iframe-transport'
	},
	shim: {
		'libs/jss.min' :{
			exports: 'jss'
		}
	}
});

require(['app'], function(App){
	App.initialize();
});