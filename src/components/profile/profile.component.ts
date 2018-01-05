import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LoadingController, ModalController, Loading, ToastController} from "ionic-angular";
import {Profile} from "../../models/profile/profile.interface";
import {DataService} from "../../providers/data/data.service";
import {AuthService} from "../../providers/auth/auth.service";
import {Subscription} from 'rxjs/Subscription';
import {User} from 'firebase/app'
/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnDestroy, OnInit{
  authenticatedUser$:Subscription;
  authenticatedUser:User;
  @Output() saveProfileResult:EventEmitter<boolean>;
  loader:Loading;
  profile = {} as Profile;

  constructor(private toast:ToastController, private loading:LoadingController, private auth:AuthService, private data:DataService, private modalCtrl:ModalController) {

    this.loader=this.loading.create({
      content:`Loading profile...`
    });
    this.saveProfileResult = new EventEmitter<boolean>();

    this.authenticatedUser$ = this.auth.getAuthenticatedUser()
      .subscribe((user:User)=>{
        this.authenticatedUser = user;
      })
  }

  ngOnInit(): void {
    this.loader.present();
    this.auth.getAuthenticatedUser()
      .subscribe((user:User) => {
        this.data.getProfile(user).then((profile)=>{
          this.profile = <Profile>profile.val();
          if(!this.profile){
            this.profile = {} as Profile;
          }
          this.loader.dismiss();
        })
      })
  }

  showAddressModal () {
    let modal = this.modalCtrl.create('AutocompletePage');
    let me = this;
    modal.onDidDismiss(data => {
      this.profile.parkingPlace = data;
      console.log(data);
    });
    modal.present();
  }

  async saveProfile(){
    if(this.authenticatedUser){
      this.profile.email = this.authenticatedUser.email;

      const result = await
        this.data.saveProfile(this.authenticatedUser,this.profile);

      this.saveProfileResult.emit(result);
      this.toast.create({
        message:`Success to save / update your profile, ${this.profile.email}`,
        duration:3000
      }).present();
    }
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

}
