
import {ResortRepository} from './resort.repository';
import * as admin from 'firebase-admin';
import {Question} from '../Entities/Questions';


export class ResortRepositoryFirebase implements ResortRepository {
  questionlist: any[]
  constructor() {
    this.questionlist = this.getQuestions();
  }

  async getAllResorts(): Promise<any> {
    const listas: any[] | PromiseLike<any[]> = [];
    const snapshot = await admin.database().ref('/NewLocations/').once('value');
    if (snapshot.val() !== null) { // If there is a result
      snapshot.forEach((child) => {
        const name = child.val().Name;
        const countryName = child.val().CountryName;
        const cityName = child.val().CityName;
        const locationScores = this.getRelevantScores(child, this.questionlist);
        listas.push({
          id: Number(child.key),
          name,
          countryName,
          cityName,
          locationScores
        });
      });
    }else {
      return Promise.resolve("Unknown error has Occurred");
    }
    return Promise.resolve(listas);
  }

  private getRelevantScores(snapshot:any, questionList: any): any{
    // @ts-ignore
    const localScores = [];
    if (!snapshot.val().hasOwnProperty('LocationScores') || snapshot.val().LocationScores === []){
      // @ts-ignore
      return localScores;
    }
    // console.log(snapshot.val().LocationScores);
    Object.keys(snapshot.val().LocationScores).map((index) => {
      const data = snapshot.val().LocationScores[index];
      const found = questionList.find((x: { id: number; }) => x.id === Number(index));
      if (found){
        if (found.group === false){
          if (data.masterOverallCount > 1){
            localScores.push({questionID: Number(index), overallScore: data.masterOverallScore});
          }
        }else{
          const totalRatings = Number(data.anonTotalCount) + Number(data.totalCount);
          if (totalRatings > 1){
            localScores.push({questionID: Number(index), overallScore: data.overallScore});
          }
        }
      }
    });
    if (localScores.length < 2){
      return [];
    }
    // @ts-ignore
    return localScores;
  }

   getQuestions(): any {
    const child: Question[] = [];
     admin.database().ref('/SubCategories').once('value').then((snapshot) => {
      snapshot.forEach((obj) => {
        if (obj.val().active) {
          const group = obj.val().group;
          const name = obj.val().CategoryName;
          const categorySlug = obj.val().CategorySlug;
          const imagePath = obj.val().ImagePath;
          const questionText = obj.val().QuestionText;
          const id = obj.val().SubCategoryId;
          const min = obj.val().Min;
          const max = obj.val().Max;
          child.push({id, group, name, categorySlug, imagePath, questionText, min, max} as Question);
        }
      });
    }).catch((error => {
       console.log('rejected', error);
     }));
    return child;
  }

  async getSingleResort(id: number): Promise<any> {
    let locationScores = [];
    const snapshot = await admin.database().ref('/NewLocations/' + id).once('value');
    if (snapshot.val() !== null) {
        const name = snapshot.val().Name;
        const countryName = snapshot.val().CountryName;
        const cityName = snapshot.val().CityName;
        const website = snapshot.val().Website;
        locationScores = this.getRelevantScores(snapshot,  this.questionlist);
        const airports = this.addDataToArray(snapshot, 'Airports');
        const pistes = this.addDataToArray(snapshot, 'Pistes');
        const min = snapshot.val().ElevationInfo.min;
        const max = snapshot.val().ElevationInfo.max;
        return Promise.resolve({
          id: Number(snapshot.key),
          name,
          countryName,
          cityName,
          locationScores,
          website,
          airports,
          pistes,
          ElevationInfo: {max, min},
        });
    }else{
      return Promise.resolve('Invalid location');
    }
  }

  private addDataToArray(snapshot: any, type: string): any{
    // @ts-ignore
    let listOfData;
    // @ts-ignore
    const dataArray = [];
    if (type === 'Airports') {
      listOfData = (snapshot.val().Airports === null) ? null : snapshot.val().Airports;
    }
    if (type === 'Pistes') {
      listOfData = (snapshot.val().ThePiste === null) ? null : snapshot.val().ThePiste;
    }
    if (listOfData !== null) {
      Object.keys(listOfData).map((personNamedIndex) => {
        // @ts-ignore
        const dataObject = listOfData[personNamedIndex];
        if (type === 'Airports') {
          dataArray.push({city: dataObject.city, country: dataObject.overallScore, distance: dataObject.distance, name: dataObject.name});
        }
        if (type === 'Pistes') {
          dataArray.push({km: dataObject.km, title: dataObject.title});
        }
      });
    }
    // @ts-ignore
    return dataArray;
  }
}
