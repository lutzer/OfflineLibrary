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
        	
        	/*this.fetched = {
        			documents : false,
        			topics: false,
        			settings: false
        	}
        	
        	//listen to sync events
        	var self = this;
        	this.documents.on('sync',function() {
        		self.onSync('documents');
        	});
        	this.topics.on('sync',function() {
        		self.onSync('topics');
        	});
        	this.settings.on('sync',function() {
        		self.onSync('settings');
        	});*/
        	
        	this.sync();
        	
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
        
        /*onSync: function(event) {
        	this.fetched[event] = true;
        	
        	if (this.fetched.documents && this.fetched.topics && this.fetched.settings)
        		Vent.trigger('allSynced');
        		
        }*/
    };
    
    Database.getInstance = function(){
        if(instance === null){
            instance = new Database();
        }
    	return instance;
    };
    
    return Database;
});