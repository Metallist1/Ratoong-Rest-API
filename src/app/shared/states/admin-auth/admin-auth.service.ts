
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AdminsUsers} from './entities/AdminUser';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  database: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.database = firebase.database();
  }

  async createNewUser(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        return this.updateUserData(email);
      }, error => {
        throw new Error(error.message);
      });
  }

  private async updateUserData(email?: string): Promise<AdminsUsers> {
    if (email == null) {
      throwError('Email is needed');
    }
    const data = {
      email,
      uid: firebase.auth().currentUser.uid,
      isAdmin: false
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    const user = await this.afAuth.currentUser;
    updates['/Admins/' + user.uid + '/'] = data;
    await firebase.database().ref().update(updates).catch(error => {
      throw new Error(error.message);
    });
    return await this.generateUser(user.uid, email, false);
  }

  async loginWithEmail(email: string, password: string): Promise<AdminsUsers> {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
      throw new Error(error.message);
    });
    const user = await this.afAuth.currentUser;
    const snapshot = await firebase.database().ref('/Admins/' + user.uid).once('value');
    if (snapshot.val() != null) {
      return await this.generateUser(user.uid, snapshot.val().email, snapshot.val().isAdmin);
    }
    return undefined;
  }

  private async generateUser(uid, email, isAdmin): Promise<AdminsUsers>{
    return {uid, email, isAdmin} as AdminsUsers;
  }

  async logout(): Promise<any> {
    await this.afAuth.signOut();
  }
}
