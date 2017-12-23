import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMyParkingPage } from './create-my-parking';

@NgModule({
  declarations: [
    CreateMyParkingPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateMyParkingPage),
  ],
})
export class CreateMyParkingPageModule {}
