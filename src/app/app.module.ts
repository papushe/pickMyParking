import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import {AngularFireModule} from "angularfire2";
import { MyApp } from './app.component';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import { AuthService } from '../providers/auth/auth.service';
import {AngularFireAuthModule} from "angularfire2/auth";
import { DataService } from '../providers/data/data.service';
import {AngularFireDatabaseModule} from 'angularfire2/database'
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule //checkthis after
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DataService
  ]
})
export class AppModule {}
