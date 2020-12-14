
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  database: any = null;

  constructor() {
    this.database = firebase.database();
  }

  async getUsers(): Promise<any> {
    return firebase.database().ref('/NewUsers').once('value').then((snapshot) => {
      const array: any = Object.values(snapshot.val());
      return array.filter(a => {
        return a.firstname !== undefined;
      }).map((a, i) => {
        const uId = a.uid;
        const firstName = a.firstname;
        const lastName = a.surname;
        const gender = a.gender;
        const country = a.country;
        const email = a.email;
        const source = a.source;
        const id = i + 1;
        return {uId, firstName, lastName, gender, country, email, source, id} as User;
      });
    });
  }

  async getUserDetails(id: string): Promise<any>{
    return firebase.database().ref('/NewUsers').child(String(id)).once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

}
