import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";

declare var google:any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapRef:ElementRef;
  lat:any;
  lng:any;
  constructor(private platform: Platform, private geoLocation: Geolocation) {

    platform.ready().then(() => {

      // get current position
      geoLocation.getCurrentPosition().then(pos => {
        this.lat=pos.coords.latitude;
        this.lng=pos.coords.longitude;
        this.showMap(this.lat,this.lng);
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

  ionViewDidLoad() {
    console.log(this.mapRef);
  }

  showMap(lat: any, lng: any){
    //location
    const location = new google.maps.LatLng(lat, lng);


    //maps options
    const options = {
      center:location,
      zoom: 10
    };

    const map = new google.maps.Map(this.mapRef.nativeElement,options);
    this.addMarker(location,map);
  }
  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    })
  }


}
