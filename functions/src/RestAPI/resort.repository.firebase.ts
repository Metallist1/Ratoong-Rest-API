
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

   private getQuestions(): any {
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
    if (type === 'questionRatings') {
      listOfData = (snapshot.val().questionRatings === null) ? null : snapshot.val().questionRatings;
    }
    if (type === 'userPreference') {
      listOfData = (snapshot.val().preferences === null) ? null : snapshot.val().preferences;
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
        if (type === 'questionRatings') {
          dataArray.push({questionId: dataObject.questionId, rating: dataObject.rating});
        }
        if (type === 'userPreference') {
          dataArray.push({name: personNamedIndex,value:dataObject });
        }
      });
    }
    // @ts-ignore
    return dataArray;
  }

  async getFilteredResort(id: number, fromDate: number, toDate: number, gender: string, country: string, age: string, skier: boolean, snowboarder: boolean, purpose: string, weeks: string, level: string): Promise<any> {
    let locationReviews = [];
    const snapshot = await admin.database().ref('/NewLocations/' + id).once('value');
    if (snapshot.val() !== null) {
      const locationUserData = [];
      const name = snapshot.val().Name;
      const cityName = snapshot.val().CityName;
      locationReviews = await this.getRelevantReviews(snapshot, fromDate, toDate);
      for (let i = 0; i < locationReviews.length; i++) {
        locationUserData.push(await this.getUserData(locationReviews[i]));
      }
      const processedData = await this.processData(locationUserData, gender, country, age, skier, snowboarder, purpose, weeks, level);
      return Promise.resolve({
        id: Number(snapshot.key),
        name,
        cityName,
        processedData
      });
    }else{
      return Promise.resolve('Invalid location');
    }
  }

  private getRelevantReviews(snapshot:any, dateBefore: number, dateAfter: number): any{
    // @ts-ignore
    const localScores = [];
    if (!snapshot.val().hasOwnProperty('LocationReviews') || snapshot.val().LocationReviews === []){
      // @ts-ignore
      return localScores;
    }
    Object.keys(snapshot.val().LocationReviews).map((index) => {
      const data = snapshot.val().LocationReviews[index];
      if (dateBefore<= data.date && data.date < dateAfter){
        localScores.push(index);
      }
    });
    // @ts-ignore
    return localScores;
  }

  private async getUserData(id: string): Promise<any>{
    const data = await admin.database().ref('/Reviews/' + id).once('value');
        if (data.val().userId !== '') {
          const userData = await admin.database().ref('/NewUsers/' + data.val().userId).once('value');
          let userDataSet = {
            type:'user not found',
            country: '',
            gender: '',
            birth: '',
            snowboarder: false,
            skier: false,
            tripCount: '',
            skillLevel: '',
            holidayType: '',
          };
          if (userData.val() !== null) {
            // @ts-ignore
            const country = (userData.val().country === null) ? '' : userData.val().country;
            // @ts-ignore
            const gender = (userData.val().gender === null) ? '' : userData.val().gender;
            // @ts-ignore
            const birth = (userData.val().birth  === null) ? '' : userData.val().birth;
            let snowboarder = false;
            let skier = false;
            let tripCount = '';
            let skillLevel = '';
            let holidayType = '';

          if (userData.val().hasOwnProperty('preferences')) {
             snowboarder = userData.val().preferences.snowboarder;
             skier =userData.val().preferences.skier;
             tripCount =userData.val().preferences.tripCount;
             skillLevel =userData.val().preferences.skillLevel;
             holidayType =userData.val().preferences.holidayType;
          }

            userDataSet = {
              type:'user',
              country,
              gender,
              birth,
              snowboarder,
              skier,
              tripCount,
              skillLevel,
              holidayType
            };
          }
          const questionRatings = this.addDataToArray(data, 'questionRatings');
          return { userDataSet, questionRatings};
        }else {
          const userDataSet = {
            type:'anonymous',
            country: '',
            gender: '',
            birth: '',
            snowboarder: false,
            skier: false,
            tripCount: '',
            skillLevel: '',
            holidayType: ''
          };
          const questionRatings = this.addDataToArray(data, 'questionRatings');
          return { userDataSet, questionRatings};
        }
  }
  private async processData(array: any, gender: string, country: string, age: string, skier: boolean, snowboarder: boolean, purpose: string, weeks: string, level: string): Promise<any> {
    let filteredList = array;
    if (array && array.length !== 0) {
      if(age !== 'None'){
        const newarr = age.split("-");
        const today = new Date();
        // @ts-ignore
        filteredList = array.filter((el) => {

          if(el.userDataSet.birth !== '') {
            const date = new Date(el.userDataSet.birth);
            const personsAge = today.getFullYear() - date.getFullYear();

            return (Number(newarr[0]) <= personsAge && personsAge <= Number(newarr[1]));
          }else{
            return false;
          }
        });
      }
      if(gender !== 'None'){
        // @ts-ignore
        filteredList = array.filter((el) => {
          return (el.userDataSet.gender.toLowerCase().indexOf(gender.toLowerCase()) > -1);
        });
      }
      if(country !== 'None'){
        // @ts-ignore
        filteredList = array.filter((el) => {
          return (el.userDataSet.country.toLowerCase().indexOf(country.toLowerCase()) > -1);
        });
      }
      if(skier){
        // @ts-ignore
        filteredList = array.filter((el) => {
          return (el.userDataSet.skier === skier);
        });
      }
      if(snowboarder){
        // @ts-ignore
        filteredList = array.filter((el) => {
          return (el.userDataSet.snowboarder === snowboarder);
        });
      }
      if(purpose !== 'None'){
        // @ts-ignore
        filteredList = array.filter((el) => {
          return (el.userDataSet.holidayType.toLowerCase().indexOf(purpose.toLowerCase()) > -1);
        });
      }
      if(weeks !== 'None'){
        // @ts-ignore
        filteredList = array.filter((el) => {
          return (el.userDataSet.tripCount.toLowerCase().indexOf(weeks.toLowerCase()) > -1);
        });
      }
      if(level !== 'None'){
        // @ts-ignore
        filteredList = array.filter((el) => {
          return (el.userDataSet.skillLevel.toLowerCase().indexOf(level.toLowerCase()) > -1);
        });
      }
    } else {
      filteredList = [];
    }
    // @ts-ignore
    return filteredList;
  }
}
