var request = require('request');
var fs = require('fs');

var config = {
	baseUrl: 'http://food2fork.com/api/',
	apiKey: 'b43e5e8d5d13fe1567cb231866243da9'
}

var query = 'fish';

var formatGetUrl = function(baseUrl, apiKey, id) {
	return baseUrl + 'get?' + 'key=' 
			+ apiKey + '&rId=' + id;
}

var formatSearchUrl = function(baseUrl, apiKey, query) {
	return baseUrl + 'search?' + 'key=' 
			+ apiKey + '&q=' + query;
}

// console.log(formatGetUrl(config.baseUrl, config.apiKey, '35120'));

request(formatSearchUrl(config.baseUrl, config.apiKey, query), function(error, response, body) {
	if (!error && response.statusCode == 200) {
		var data = JSON.parse(body);
		data.recipes.forEach(function(element, index, array) {
			console.log(element.recipe_id);
			var recipe_id = element.recipe_id;
			request(formatGetUrl(config.baseUrl, config.apiKey, recipe_id), function(error, res, body) {
				var d = JSON.parse(body);
				console.log(d.recipe.title);
				console.log(d.recipe.ingredients);
			});
		});
		// console.log(data.recipes);
	}
});

// request(formatSearchUrl(config.baseUrl, config.apiKey, query)).pipe(fs.createWriteStream(query + '.json'));