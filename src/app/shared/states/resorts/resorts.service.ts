
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Resort} from './entities/resort';
import {SummaryLocation} from './entities/summaryLocation';

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
      return snapshot.val().map(a => {
        const id = a.LocationId;
        const name = a.CityName;
        const commonId = a.CommonId;
        return {id, commonId, name} as Resort;
      });
    });
  }

  async getAllLocations(): Promise<SummaryLocation[]>  {
    const allresortList = await this.getResorts();
    const properResortList = [];
    allresortList.forEach((value) => {
      if (value.commonId && value.name) {
        properResortList.push(value);
      }
    });
    const snapshot = await firebase.database().ref('/ResortCommon').once('value');
    const list = [];
    await snapshot.forEach((child) => {
      const name = child.val().Name;
      const id = child.val().CommonId;
      const resortList = [];
      for (let i = 0; i < properResortList.length; i++) {
        if (properResortList[i].commonId === id) {
          resortList.push(properResortList[i]);
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
}
