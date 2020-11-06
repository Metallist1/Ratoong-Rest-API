
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Ambassador} from './entities/ambassador';
import {Sponsor} from './entities/sponsor';

@Injectable({
  providedIn: 'root'
})
export class AmbassadorsService {
  database: any = null;

  sponsors: { title: string, url: string, link: string }[] = [
    {
      title: 'Head',
      url: 'https://firebasestorage.googleapis.com/v0/b/ratoong-dev.appspot.com/o/service-images%2Fsponsors%2Fsponsors_head.png?alt=media&token=3bfd92d5-7a38-45df-898b-bc693bfebdc7',
      link: 'https://www.gumpel.dk/'
    },
    {
      title: 'Skiing',
      url: 'https://firebasestorage.googleapis.com/v0/b/ratoong-dev.appspot.com/o/service-images%2Fsponsors%2Fsponsors_skiing.png?alt=media&token=f27b4896-2fc0-4399-a9d2-47eac45d9f5e',
      link: 'https://skiing.de/'
    },
    {
      title: 'The-ski-guru',
      url: 'https://firebasestorage.googleapis.com/v0/b/ratoong-dev.appspot.com/o/service-images%2Fsponsors%2Fsponsors_the-ski-guru.png?alt=media&token=dd9ffa92-8635-421a-9541-cce581c63526',
      link: 'https://www.the-ski-guru.com/'
    },
    {
      title: 'dbp-adventure',
      url: 'https://firebasestorage.googleapis.com/v0/b/ratoong-dev.appspot.com/o/service-images%2Fsponsors%2Fsponsors_dbp-adventure.png?alt=media&token=114c5090-a886-4a21-af2b-682e81d66575',
      link: 'https://dbp-adventures.co.uk/'
    },
    {
      title: 'Steep-&-deep',
      url: 'https://firebasestorage.googleapis.com/v0/b/ratoong-dev.appspot.com/o/service-images%2Fsponsors%2Fsponsors_steep%26deep.png?alt=media&token=624364b9-6627-441a-868b-4b7a0fa94b1d',
      link: 'http://steep-deep.dk/'
    }
  ];

  constructor(
  ) {
    this.database = firebase.database();
  }

  async getAmbassadors(): Promise<any> {
    return firebase.database().ref('/Ambassadors').once('value').then((snapshot) => {
      return snapshot.val().map(a => {
        const description = a.description;
        const name = a.name;
        const image = a.image;
        const social = a.social.instagram;
        return {name, image, description, social} as Ambassador;
      });
    });
  }

  async getSponors(): Promise<any> {
    return this.sponsors.map(a => {
        const title = a.title;
        const link = a.link;
        const url = a.url;
        return {title, link, url} as Sponsor;
      });
  }

}
