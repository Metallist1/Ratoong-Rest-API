
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
      return snapshot.val().map(a => {
        const name = a.CityName;
        const commonId = a.CommonId;
        return {commonId, name} as Resort;
      });
    });
  }

}
