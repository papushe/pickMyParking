import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, ModalController, NavController, Platform} from 'ionic-angular';
import {Profile} from "../../models/profile/profile.interface";
import {USER_LIST} from "../../mocks/profiles/profiles";
import {Geolocation} from "@ionic-native/geolocation";
import {DataService} from "../../providers/data/data.service";
import {Observable} from "rxjs/Observable";

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-pick-a-parking',
  templateUrl: 'pick-a-parking.html',
})
export class PickAParkingPage {
  lat:any;
  lng:any;
  address:any;
  userList:Profile[] = USER_LIST;
  query:string;
  geoCoder:any;
  parkingList: Profile[];
  myCurrentPlace:string='';
  loader:Loading;
  noPlace:string = '';
  constructor(private loading:LoadingController,private data:DataService, private navCtrl:NavController, private modalCtrl:ModalController,private platform: Platform, private geoLocation: Geolocation) {
    this.geoCoder = new google.maps.Geocoder;
    this.loader=this.loading.create({
      content:`Loading my current place...`
    });
    platform.ready().then(() => {
      this.loader.present();
      geoLocation.getCurrentPosition().then(pos => {
        this.lat=pos.coords.latitude;
        this.lng=pos.coords.longitude;
        this.loader.dismiss();
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      });
      const watch = geoLocation.watchPosition().subscribe(pos => {
        this.lat=pos.coords.latitude;
        this.lng=pos.coords.longitude;
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      });
      // to stop watching
      watch.unsubscribe();
    });
  }
  pickMyPlace(){
    this.address = '';
    this.noPlace = '';
    this.geocodeLatLng(this.geoCoder ,this.lat, this.lng);
  }
  selectProfile(profile:Profile){
    this.navCtrl.setRoot('TabsPage',{tabIndex:1, profile:profile})
  }

  searchParking(query:string){
    this.data.searchUser(query).subscribe(profiles=>{
      this.parkingList = profiles;
    })
  }

  showAddressModal (place) {
    let modal = this.modalCtrl.create('AutocompletePage');
    // let me = this;
    if(place){
      this.searchParking(place);
    }else{
      modal.onDidDismiss(data => {
        this.address = data;
        this.searchParking(this.address);
      });
    }
    modal.present();
  }

  geocodeLatLng(geocoder, lat, lng) {
    let latLng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    geocoder.geocode({'location': latLng}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.myCurrentPlace = results[0].formatted_address;
        } else {
          // window.alert('No results found');
          this.noPlace = 'No results found';
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
        this.noPlace = 'Geocoder failed due to: ' + status;
      }
    });
    if(this.myCurrentPlace){
      this.searchParking(this.myCurrentPlace);
    }else{
      this.noPlace = 'No results found, please try again..'
    }
  }

  ionViewDidLoad() {

  }
}
