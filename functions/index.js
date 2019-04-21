/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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