
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
      return array.map(a => {
        const firstName = a.firstname;
        const lastName = a.surname;
        const gender = a.gender;
        const country = a.country;
        const email = a.email;
        const source = a.source;
        return {firstName, lastName, gender, country, email, source} as User;
      });
    });
  }

}
