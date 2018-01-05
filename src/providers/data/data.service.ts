import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database'
// import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';


import {User} from 'firebase/app'
import {Profile} from "../../models/profile/profile.interface";
import "rxjs/add/operator/take";
import * as firebase from "firebase";
import {query} from "@angular/core/src/animation/dsl";

@Injectable()
export class DataService {

  profileObject:AngularFireObject<Profile>;

  constructor(private database:AngularFireDatabase) {
    console.log('Hello DataService Provider');
  }


  fixPlaceNames(place){
    if(place){
      place = place.replace(',','');
      let queries = place.split(' ');

      var index = queries.indexOf("ישראל");
      if (index > -1) {
        queries.splice(index, 1);
      }
      return queries;
    }
  }

  searchUser(pickAParking:string){
    let queries = this.fixPlaceNames(pickAParking);
    if(!queries){
      queries[0] = '';
    }
    const query = this.database.list<Profile>(`/profiles/`,query =>
      query.orderByChild('parkingPlace').startAt(queries[0] || ''));
    return query.valueChanges().take(1);
  }

  getProfile(user:User){
    const ref = firebase.database().ref(`/profiles/${user.uid}`);

    return ref.once('value');
  }


  async saveProfile(user:User,profile:Profile){
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    try{
      await this.profileObject.set(profile);
      return true;
    }catch (e){
      console.error(e);
      return false;
    }

  }

}
