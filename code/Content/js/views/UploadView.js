define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'iframeTransport',
	'vent',
	'models/Database',
	'models/DocumentModel',
	'values/Languages',
	'text!templates/uploadTemplate.html',
], function($, _, Backbone, Marionette, iframeTransport, Vent, Database, DocumentModel, Languages, template){
	
	var UploadView = Marionette.ItemView.extend({
		
		initialize: function(options) {
			this.collection = Database.getInstance().topics;
		},
		
		collectionEvents: {
		    "sync": "render"
		},
		
		events: {
		    'submit form' : 'uploadFile',
		    'change #file-chooser' : 'onFileChoosen'
		},
		
		template : _.template(template),
		
		templateHelpers: {
	        languages: Languages
	    },
	    
	    onShow: function() {
	    	this.$('#title').focus();
	    },
		
		uploadFile: function(event) {
			var self = this;
			var values = {
					author: $('#author').val(),
					title: $('#title').val(),
					description: $('#description').val(),
					keywords: $('#keywords').val(),
					published: $('#published').val(),
					isbn: $('#isbn').val(),
					language: $("#language").val(),
					topic_id: $("#topic").val()
			};

			if(event) 
				event.preventDefault();

			var model = new DocumentModel(values);
			
			model.save(values, { 
				iframe: true,
				files: this.$('form :file'),
				data: values,
				success: function(model,response) {
					if ('error' in response) {
						Vent.trigger('dialog:open', {
							title: "Error uploading", 
							text: response.error.message, 
							type: 'message'
						});
					} else {
						self.addModel(model);
						window.location.href = "#document/"+response.id;
						Vent.trigger('dialog:close');
					}	
				},
				error: function(model,response) {
					Vent.trigger('dialog:open', {
						title: "Error uploading", 
						text: response.responseText, 
						type: 'message'
					});
				}
			});
			
			//open upload dialog
			Vent.trigger('dialog:open', {
				title: "Uploading Document", 
				text: "Depending on the file size, this may take a while.", 
				type: 'progress',
				callback: function() {
					window.location.href = "#upload";
				}
			});
		},
		
		addModel: function(model) {
			Database.getInstance().documents.add(model);
		},
		
		onFileChoosen: function(event) {
			filename = event.target.value.split('/').pop()
			filename = filename.split('\\').pop();
			this.$('#filepath').html(filename);
		}
	});
	
	return UploadView;
	
});