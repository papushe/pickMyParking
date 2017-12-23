import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickAParkingPage } from './pick-a-parking';

@NgModule({
  declarations: [
    PickAParkingPage,
  ],
  imports: [
    IonicPageModule.forChild(PickAParkingPage),
  ],
})
export class PickAParkingPageModule {}
