import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {AutocompletePage} from "../autocomplete/autocomplete";

declare var google:any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapRef:ElementRef;
  @ViewChild('pacInput') pacInputRef:ElementRef;
  lat:any;
  lng:any;
  constructor(private modalCtrl:ModalController,private platform: Platform, private geoLocation: Geolocation) {

    platform.ready().then(() => {

      // get current position
      geoLocation.getCurrentPosition().then(pos => {
        this.lat=pos.coords.latitude;
        this.lng=pos.coords.longitude;
        this.initAutocomplete();
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
  // ionViewDidLoad() {
  //   console.log(this.mapRef);
  //
  // }

  initAutocomplete() {
    const location = new google.maps.LatLng(this.lat, this.lng);
    const options = {
      center: location,
      zoom: 13,
      mapTypeId: 'roadmap'
    };
    let map = new google.maps.Map(this.mapRef.nativeElement, options);

    // Create the search box and link it to the UI element.
    let input = this.pacInputRef.nativeElement;
    let searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    // Listen for the event fired when the profile selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        let icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          // icon: icon,
          // title: place.name,
          // position: place.geometry.location
          position: location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}
