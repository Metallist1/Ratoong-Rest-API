
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Resort} from './entities/resort';
import {SummaryLocation} from './entities/summaryLocation';
import {Country} from './entities/country';

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
        return {id, commonId, name} as Resort;
      });
    });
  }

  async getAllLocations(): Promise<SummaryLocation[]>  {
    const allresortList = await this.getResorts();
    const snapshot = await firebase.database().ref('/ResortCommon').once('value');
    const list = [];
    await snapshot.forEach((child) => {
      const name = child.val().Name;
      const id = child.val().CommonId;
      const resortList = [];
      for (let i = 0; i < allresortList.length; i++) {
        if (allresortList[i].commonId === id) {
          resortList.push(allresortList[i]);
        }
      }
      const location: SummaryLocation = {
        id,
        name,
        ResortList: resortList
      };
      list.push(location);
    });
    return list;
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
}
