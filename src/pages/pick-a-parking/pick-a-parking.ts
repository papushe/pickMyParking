import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {USER} from "../../models/user/user.interface";
import {USER_LIST} from "../../mocks/users/users";

/**
 * Generated class for the PickAParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-pick-a-parking',
  templateUrl: 'pick-a-parking.html',
})
export class PickAParkingPage {

  userList:USER[] = USER_LIST;

  constructor() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickAParkingPage');
  }
}
