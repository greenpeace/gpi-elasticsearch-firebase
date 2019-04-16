# Connect ealsticsearch engine with Firebase

Firebase is a hosted noSQL solution from Google has some limitations regarding query support. Firebase only support startAt(), endAt(), and equalTo() conditions and not any form of fulltext support, let alone aggregations / facets. This Firebase Cloud Functions will show you how to add fulltext query and aggregation support to Firebase using ElasticSearch.

## Functions Code

See file [functions/index.js](functions/index.js) for the code.

The dependencies are listed in [functions/package.json](functions/package.json).

## Trigger rules

The function triggers on upload of any file to Firebase project.

## Setting up

 1. Setup ElasticSearch VM - Go to https://console.cloud.google.com/ and login with your Google account - go to the Cloud Launcher using the sidenav, search for ‘Elasticsearch’ (Inception!) and select the Bitnami image.
 2. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com).
 3. You must have the Firebase CLI installed. If you don't have it install it with `npm install -g firebase-tools` and then configure it with `firebase login`.
 4. Configure the CLI locally by using `firebase use --add` and select your project in the list.
 5. Install dependencies locally by running: `cd functions; npm install --save request request-promise lodash; cd -` 
 6. set the needed firebase config variables to connect to your elastic search server `firebase functions:config:set elasticsearch.username="user" elasticsearch.password="my_password" elasticsearch.url="http://<yoururl>/elasticsearch/`

## Deploy and test

1. Deploy your Cloud Functions using `firebase deploy --only functions:indexTrashToElastic`
2. Go to the Firebase Console **Database** tab and chnage a value in the database