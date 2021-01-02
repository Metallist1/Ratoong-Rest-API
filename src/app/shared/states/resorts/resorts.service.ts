
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Resort} from './entities/resort';

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

  async getResortDetails(id: string): Promise<any>{
    return firebase.database().ref('/NewLocations').child(String(id)).once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  async getAllLocations(id: number): Promise<Resort[]>  {
    const allresortList = await this.getResorts();
    const resortList = [];
    for (let i = 0; i < allresortList.length; i++) {
      if (String(allresortList[i].commonId) === String(id)) {
          resortList.push(allresortList[i]);
        }
      }
    return resortList;
  }
}
