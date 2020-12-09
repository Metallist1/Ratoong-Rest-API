
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Resort} from './entities/resort';
import {Country} from './entities/country';
import {Question} from './entities/question';

@Injectable({
  providedIn: 'root'
})
export class ResortsService {
  database: any = null;

  constructor() {
    this.database = firebase.database();
  }

  async getResorts(): Promise<any> {
    return firebase.database().ref('/NewLocations').once('value').then((snapshot) => {
      return snapshot.val().filter(a => {
        return a.CityName !== undefined;
      }).map(a => {
        const id = a.LocationId;
        const name = a.CityName;
        const commonId = a.CommonId;
        const resortName = a.Name;
        return {id, commonId, name, resortName} as Resort;
      });
    });
  }

  async getQuestions(): Promise<Question[]>  {
    const child = [];
    await firebase.database().ref('/SubCategories').once('value').then((snapshot) => {
      snapshot.forEach((obj) => {
        if (obj.val().active) {
          const id = obj.val().SubCategoryId;
          const name = obj.val().CategoryName;
          if (obj.val().active){
            child.push({id, name} as Question);
          }
        }
      });
    });
    return child;
  }

  async getAllLocations(id: number): Promise<Resort[]>  {
    const allresortList = await this.getResorts();
    const resortList = [];
    for (let i = 0; i < allresortList.length; i++) {
      if (allresortList[i].commonId === String(id)) {
          resortList.push(allresortList[i]);
        }
      }
    return resortList;
  }

  async getAllCountries(): Promise<Country[]> {
    const snapshot = await firebase.database().ref('/Countries').once('value');
    return snapshot.val().map(a => {
        const countId = a.CountryId;
        const name = a.Name;
        const region = a.Region;
        return {countryId: countId, name, region} as Country;
    });
  }

  async getFilteredResortData(id: string, country: string, age: string, gender: string, fromDate: string, toDate: string): Promise<any>{
    const getFilteredData = await firebase.functions().httpsCallable('getFilteredData');
    return getFilteredData({ id, country, age, gender, fromDate, toDate});
  }
}
