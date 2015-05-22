define([
        'models/DocumentCollection',
        'models/TopicCollection',
        'models/SettingsModel'
], function (DocumentCollection, TopicCollection, SettingsModel) {
	
	var instance = null;
	 
    function Database(){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one Singleton, use Database.getInstance()");
        } 
        
        this.initialize();
    };
    
    Database.prototype = {
        initialize: function(){
            
        	this.documents = new DocumentCollection();
        	this.topics = new TopicCollection();
        	this.settings = new SettingsModel();
        	
        	this.sync();
        	
        	console.trace('init database');
        	
        },
        
        reset: function() {
        	instance = null;
        },
        
        sync: function(options) {
        	//fetch data
        	this.documents.fetch(options);
        	this.topics.fetch(options);
        	this.settings.fetch(options);
        }
    };
    
    return {
    	getInstance : function() {
	        if(instance === null){
	            instance = new Database();
	        }
	    	return instance;
    	}
    };
});