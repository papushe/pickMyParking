import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {LoginResponse} from "../../models/login/login-response.interface";
import {DataService} from "../../providers/data/data.service";
import {User} from "firebase";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private data:DataService, private toast:ToastController, private navCtrl: NavController) {
  }

  login(event:LoginResponse){
    console.log(event);
    if(!event.error){
      this.toast.create({
        message:`Welcome to PickMyParking, ${event.result.email}`,
        duration:3000
      }).present();
      this.data.getProfile(<User>event.result).then((snapshot) =>{
        const a = snapshot.exists();  // true
        a ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('ProfilePage');
      });



    }else{
      this.toast.create({
        message:event.error.message,
        duration:3000
      }).present();
    }
  }

}
