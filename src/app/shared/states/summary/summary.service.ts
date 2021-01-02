import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Country} from './entities/country';
import {Resort} from '../resorts/entities/resort';
import {Question} from './entities/question';
import {ResortsService} from '../resorts/resorts.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  database: any = null;

  constructor(private resortsService: ResortsService) {
    this.database = firebase.database();
  }

  async getFilteredResortData(id: string, country: string, age: string, gender: string, fromDate: string, toDate: string): Promise<any>{
    const getFilteredData = await firebase.functions().httpsCallable('getFilteredData');
    return getFilteredData({ id, country, age, gender, fromDate, toDate});
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

  async getAllLocations(id: number): Promise<Resort[]>  {
    const allresortList = await this.resortsService.getResorts();
    const resortList = [];
    for (let i = 0; i < allresortList.length; i++) {
      if (String(allresortList[i].commonId) === String(id)) {
        resortList.push(allresortList[i]);
      }
    }
    return resortList;
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

}
