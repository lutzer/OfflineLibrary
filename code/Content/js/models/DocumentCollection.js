define([
        'underscore',
        'backbone',
        'models/DocumentModel',
        'values/Constants'
], function(_, Backbone, DocumentModel, Constants){
	
	DocumentCollection = Backbone.Collection.extend({
		
		model: DocumentModel,

		url : Constants['web_service_url']+"?documents",
		
		// reverse order collection
		comparator: function (model) {
		    return -model.get('id');
		},
		
		getAuthors : function() {
			var authorStrings = this.pluck('author');
			// create list
			authors = _.map(authorStrings, function(string) {
				return string.split(';')
			});
			// flatten list
			authors = _.flatten(authors);
			// trim whitespaces and make lowercase
			authors = _.map(authors, function(author) {
				return author.trim().toLowerCase();
			})
			// throw out duplicates
			authors = _.uniq(authors);
			return authors.sort();
		},
		
		getKeywords: function() {
			var keywordStrings = this.pluck('keywords');
			var keywords = _.map(keywordStrings,function(keywords) {
				return keywords.split(",");
			})
			keywords = _.flatten(keywords);
			keywords = _.map(keywords, function(keyword) {
				return keyword.trim().toLowerCase();
			});
			keywords = _.uniq(keywords);
			return keywords.sort();
		},
		
		getTitles: function() {
			var titles = _.map(this.models,function(model) {
				return { 
					title: model.get('title'),
					id: model.get('id'),
					color : model.get('topic_color')
				}
			})
			var sortedTitles = _.sortBy(titles,function(entry) {
				return entry.title;
			});
			
			return sortedTitles;
		},
		
		getPublished: function() {
			var publishedYears = this.pluck('published');
			publishedYears = _.uniq(_.compact(publishedYears))
			return publishedYears.sort().reverse();
		},
		
		search: function(searchString) {
			this.fetch({data : 
				$.param({ search : searchString}) 
			});
		}
	
	});
	
	return DocumentCollection;
});