define([
        'underscore',
        'backbone',
        'values/Constants'
], function(_, Backbone, Constants){

	var SettingsModel = Backbone.Model.extend({

		urlRoot : Constants['web_service_url']+"?settings",
		
		defaults: {
			about_text: 'Die Geschworenen hatten Dschochar Zarnajew Anfang April für schuldig befunden, den islamistisch motivierten Anschlag am 15. April 2013 gemeinsam mit seinem später getöteten Bruder Tamerlan verübt zu haben. Seit Ende April ging es in einem zweiten Prozessabschnitt um das Strafmaß. Nach den Schlussplädoyers von Staatsanwaltschaft und Verteidigung hatten sich die Geschworenen zu Beratungen zurückgezogen.'
		}
		
		
	});

	// Return the model for the module
	return SettingsModel;

});