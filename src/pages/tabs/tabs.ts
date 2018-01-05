import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {Profile} from "../../models/profile/profile.interface";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  @ViewChild('tabs') tabs: Tabs;

  tab1Root:string;
  tab2Root:string;
  tab3Root:string;
  tab2Params:any;
  mySelectedIndex:number;


  constructor(private navCtrl: NavController,private navParams:NavParams) {

    this.mySelectedIndex = this.navParams.data.tabIndex  || 0;
    this.tab2Params = {profile: this.navParams.data.profile};

    this.tab1Root = 'PickAParkingPage';
    this.tab2Root = 'MessagesPage';
    this.tab3Root = 'ProfilePage';
  }

  ionViewDidEnter() {
    // this.tabs.select(this.navParams.data.tabIndex || 0);
  }
  ionViewDidLoad() {
    // this.tabs.select(this.navParams.data.tabIndex || 0);
  }
  doChange(ev:any) {
    // if (ev.length>1) {
      ev.popToRoot();
    // }
  }

}
