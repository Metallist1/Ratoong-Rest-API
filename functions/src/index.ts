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

  let fromDate = '1971-01-01';
  let toDate = '2049-01-01';

  if(req.query.fromDate){
    fromDate = String(req.query.fromDate)
  }
  if(req.query.toDate){
    toDate = String(req.query.toDate)
  }
  let gender = 'None';

  if(req.query.gender){
    gender = String(req.query.gender)
  }
  let country = 'None';

  if(req.query.country){
    country = String(req.query.country)
  }
  let age = 'None';

  if(req.query.age){
    const userKeyRegExp = /^[0-9]{2}\-[0-9]{2}$/;

    const valid = userKeyRegExp.test(String(req.query.age));

    if(valid){
      age = String(req.query.age)
    }else{
      res.status(400).json({
        message: "Incorrect age format"
      })
    }
  }
  let skier = false;

  if(req.query.skier){
    skier = String(req.query.skier).toLowerCase() === "true"
  }
  let snowboarder = false;

  if(req.query.snowboarder){
    snowboarder = String(req.query.snowboarder).toLowerCase() === "true"
  }
  let purpose = 'None';

  if(req.query.purpose){
    purpose = String(req.query.purpose)
  }
  let weeks = 'None';

  if(req.query.weeks){
    weeks = String(req.query.weeks)
  }
  let level = 'None';

  if(req.query.level){
    level = String(req.query.level)
  }
  // Need date (Default to no date if none is present
  // need specific filter. Do not run this query without filter
  // @ts-ignore
  dependencyFactory.getResortController().getFilteredResort(Number(req.query.id), fromDate, toDate, gender, country, age, skier, snowboarder, purpose, weeks, level).then((data: any) =>{
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



exports.getFilteredData = functions.https.onCall((data, context) => {

  let fromDate = '1971-01-01';
  let toDate = '2049-01-01';

  if(data.fromDate){
    fromDate = String(data.fromDate)
  }
  if(data.toDate){
    toDate = String(data.toDate)
  }
  let gender = 'None';

  if(data.gender){
    gender = String(data.gender)
  }
  let country = 'None';

  if(data.country){
    country = String(data.country)
  }
  let age = 'None';

  if(data.age){
    const userKeyRegExp = /^[0-9]{2}\-[0-9]{2}$/;

    const valid = userKeyRegExp.test(String(data.age));

    if(valid){
      age = String(data.age)
    }
  }

  return dependencyFactory.getResortController().getFilteredResort(Number(data.id), fromDate, toDate, gender, country, age, false, false, 'None', 'None', 'None');

});
