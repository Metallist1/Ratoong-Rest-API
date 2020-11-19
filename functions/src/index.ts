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

exports.getAllResorts = functions.https.onRequest((req, res) => {
  if(req.method !== "GET"){
    res.status(400).json({
      message: "Not Allowed"
    })
  }
  dependencyFactory.getResortController().getAllResorts().then((data) =>{
    res.status(200).json({
      message : JSON.stringify(data)
    })
  }).catch((error => {
    console.log('rejected', error);
  }));
});

exports.getSingleResort = functions.https.onRequest((req, res) => {
  if(req.method !== "GET"){
    res.status(400).json({
      message: "Not Allowed"
    })
  }
  if(!req.query.id){
    res.status(404).json({
      message: "Missing id"
    })
  }
  dependencyFactory.getResortController().getSingleResort(Number(req.query.id)).then((data) =>{
    console.log("asynchronous logging has val:",data)
    res.status(200).json({
      message : JSON.stringify(data)
    })
  }).catch((error => {
    console.log('rejected', error);
  }));
});

exports.getFilteredResort = functions.https.onRequest((req, res) => {
  if(req.method !== "GET"){
    res.status(400).json({
      message: "Not Allowed"
    })
  }
  const textas = req.query.text;
  const textas2 = req.query.newtext;
  res.status(200).json({
    message : JSON.stringify(textas +" split "+ textas2)
  })
});



exports.addMessage = functions.https.onCall((data, context) => {
  return {
    firstNumber: "Help",
  };
});
