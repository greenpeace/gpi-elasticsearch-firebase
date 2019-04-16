
const functions = require('firebase-functions');
const _ = require('lodash');
const request = require('request-promise');

exports.indexTrashToElastic = functions.database.ref('/rubbish/{rubbishId}').onWrite(( change,context) => {
		
		let rubbishData = change.after.val();
		let rubbishId   = change.after.id;

		console.log('Indexing rubbish ', rubbishId, rubbishData);

		let elasticsearchFields = ['brand','date','ingUrl','lat','long','ts','typeoftrash','user'];
		let elasticSearchConfig = functions.config().elasticsearch;
		let elasticSearchUrl = elasticSearchConfig.url + 'brand/rubbish/' + rubbishId;
		let elasticSearchMethod = rubbishData ? 'POST' : 'DELETE';

		let elasticsearchRequest = {
			method: elasticSearchMethod,
			uri: elasticSearchUrl,
			auth: {
				username: elasticSearchConfig.username,
				password: elasticSearchConfig.password,
			},
			body: _.pick(rubbishData, elasticsearchFields),
			json: true
		};

		return request(elasticsearchRequest).then(response => {
			console.log('Elasticsearch response', response);
		})
});