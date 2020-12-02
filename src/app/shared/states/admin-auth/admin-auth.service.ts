
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

  private async updateUserData(email, isAdmin?, apiKey?, apiSecret?): Promise<AdminsUsers> {
    if (email == null) {
      throwError('Email is needed');
    }
    isAdmin = (isAdmin == null) ? false : isAdmin;
    apiKey = (apiKey == null) ? null : apiKey;
    apiSecret = (apiSecret == null) ? null : apiSecret;
    const data = {
      uid: firebase.auth().currentUser.uid,
      email,
      isAdmin,
      apiKey,
      apiSecret
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    const user = await this.afAuth.currentUser;
    updates['/Admins/' + user.uid + '/'] = data;
    await firebase.database().ref().update(updates).catch(error => {
      throw new Error(error.message);
    });
    return await this.generateUser(user.uid, email, isAdmin, apiKey, apiSecret);
  }

  async loginWithEmail(email: string, password: string): Promise<AdminsUsers> {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
      throw new Error(error.message);
    });
    const user = await this.afAuth.currentUser;
    const snapshot = await firebase.database().ref('/Admins/' + user.uid).once('value');
    if (snapshot.val() != null) {
      const apiSecret = (snapshot.val().apiSecret == null) ? null : snapshot.val().apiSecret;
      const apiKey = (snapshot.val().apiKey == null) ? null : snapshot.val().apiKey;
      return await this.generateUser(user.uid, snapshot.val().email, snapshot.val().isAdmin, apiKey, apiSecret);
    }
    return undefined;
  }

  private async generateUser(uid, email, isAdmin, apiKey?, apiSecret?): Promise<AdminsUsers>{
    return {uid, email, isAdmin, apiKey, apiSecret} as AdminsUsers;
  }

  async logout(): Promise<any> {
    await this.afAuth.signOut();
  }

  public async changePassword(currentPassword, newPasswrd): Promise<any> {
    const user = firebase.auth().currentUser;
    const credential = await firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      currentPassword
    );

    await user.reauthenticateWithCredential(credential).catch((error) => {
      throw new Error(error.message);
    });

    await firebase.auth().currentUser.updatePassword(newPasswrd).catch(error => {
        throw new Error(error.message);
      });
  }

  public async generateAPIKeys(User: AdminsUsers): Promise<AdminsUsers>{
    const apiKey = this.newGuid('xxxxxxxxxxxxxxxxxxxxxxxx');
    const apiSecret =  this.newGuid('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    return await this.updateUserData(User.email, User.isAdmin, apiKey, apiSecret);
  }

  private newGuid(stringToReplace: string): any {
    return stringToReplace.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise one-variable-per-declaration
      const r = Math.random() * 16 | 0,
        // tslint:disable-next-line:no-bitwise
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
