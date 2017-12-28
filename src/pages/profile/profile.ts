import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {USER_LIST} from "../../mocks/users/users";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  user = USER_LIST[Math.floor(Math.random() * (2-0) + 0)];

  constructor() {
  }

  ionViewDidLoad() {
    console.log(this.user);
  }

}
