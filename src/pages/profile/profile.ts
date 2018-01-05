import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {USER_LIST} from "../../mocks/profiles/profiles";

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

  constructor(private navCtrl:NavController) {

  }

  saveProfileResult(event:boolean){
    event ? this.navCtrl.setRoot('TabsPage', {tabIndex:2}): console.log('Not authenticated or saved');
  }

  ionViewDidLoad() {
    console.log(this.user);
  }

}
