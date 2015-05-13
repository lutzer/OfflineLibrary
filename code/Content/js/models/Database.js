define([
        'models/DocumentCollection'
], function (DocumentCollection) {
	
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
        	
        	//fetch data
        	this.documents.fetch();
        	
        },
        
        reset: function() {
        	instance = null;
        }
    };
    
    Database.getInstance = function(){
        if(instance === null){
            instance = new Database();
        }
        return instance;
    };
    
    return Database;
});