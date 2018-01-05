import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MESSAGE_LIST} from "../../mocks/messages/messages";
import {MESSAGE} from "../../models/messages/message.interface";
import {Profile} from "../../models/profile/profile.interface";

/**
 * Generated class for the CreateMyParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  messageList:MESSAGE[] = MESSAGE_LIST;
  profile:Profile;

  constructor(private navCtrl: NavController,private navParams: NavParams) {
    this.profile = this.navParams.get('profile');
  }

  ionViewDidLoad() {
    console.log(this.messageList);
  }

}
