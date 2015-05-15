define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'vent',
	'values/Constants',
	'models/DocumentModel',
	'text!templates/documentTemplate.html',
], function($, _, Backbone, Marionette, Vent, Constants, DocumentModel, template){
	
	var DocumentView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			this.model = new DocumentModel({id : options.id});
			this.model.fetch();
		},
		
		modelEvents : {
			'sync' : 'render'
		},
		
		template : _.template(template),
		
		templateHelpers: function () {
		    return {
		        format: this.model.get('file').split('.').pop(),
		        filepath: Constants['upload_directory']+this.model.get('id')+'/'+this.model.get('file')
		    }
	    },
	});
	
	return DocumentView;
	
});