import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from "./dependency-factory";
const serviceAccount = require('../final-exam.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://final-exam-9302a.firebaseio.com'
})

const dependencyFactory = new DependencyFactory();

export const syncRatings =  functions.database.ref('NewLocations/{locationId}/LocationScores/{id}')
  .onUpdate((snap,context) =>{
    return dependencyFactory.getReviewController().syncRatings(snap,context);
  });
