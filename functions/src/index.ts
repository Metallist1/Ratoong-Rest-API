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
    res.status(405).json({
      data: "Not Allowed"
    })
  }
  dependencyFactory.getResortController().getAllResorts().then((data) =>{
    res.status(200).json({
      data
    })
  }).catch((error => {
    res.status(500).json({
      data: "An error has occurred"
    })
    console.log('rejected', error);
  }));
});

exports.getSingleResort = functions.https.onRequest((req, res) => {
  if(req.method !== "GET"){
    res.status(405).json({
      message: "Not Allowed"
    })
  }
  if(!req.query.id){
    res.status(400).json({
      message: "Missing id"
    })
  }
  dependencyFactory.getResortController().getSingleResort(Number(req.query.id)).then((data) =>{
    res.status(200).json({
      data
    })
  }).catch((error => {
    res.status(500).json({
      data: "An error has occurred"
    })
    console.log('rejected', error);
  }));
});

exports.getFilteredResort = functions.https.onRequest((req, res) => {

  if(req.method !== "GET"){
    res.status(400).json({
      message: "Not Allowed"
    })
  }

  if(!req.query.id){
    res.status(400).json({
      message: "Missing id"
    })
  }

  if(!req.query.filter){
    res.status(400).json({
      message: "Missing filter"
    })
  }

  let fromDate = '1971-01-01';
  let toDate = '2049-01-01';

  if(req.query.fromDate){
    fromDate = String(req.query.fromDate)
  }
  if(req.query.toDate){
    toDate = String(req.query.toDate)
  }
  // Need date (Default to no date if none is present
  // need specific filter. Do not run this query without filter
  // @ts-ignore
  dependencyFactory.getResortController().getFilteredResort(Number(req.query.id), String(req.query.filter), fromDate, toDate).then((data: any) =>{
    res.status(200).json({
      data
    })
  }).catch(((error: any) => {
    res.status(500).json({
      data: "An error has occurred"
    })
    console.log('rejected', error);
  }));
});



exports.addMessage = functions.https.onCall((data, context) => {
  return {
    firstNumber: "Help",
  };
});
