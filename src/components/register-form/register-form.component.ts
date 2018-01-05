import { Component,Output,EventEmitter } from '@angular/core';
import {Account} from '../../models/account/account.interface'
import {ToastController} from "ionic-angular";
import {AuthService} from "../../providers/auth/auth.service";
import {LoginResponse} from "../../models/login/login-response.interface";
@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  account = {} as Account;
  // passwordAgain:string = '';
  @Output() registerStatus: EventEmitter<LoginResponse>;
  constructor(private toast:ToastController, private auth: AuthService) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register(){
    if(this.account.password === this.account.passwordAgain){
      try{
        const result = await
          this.auth.createUserWithEmailAndPassword(this.account);
        this.registerStatus.emit(result);
        console.log(result);
      }catch (e){
        console.error(e);
        this.registerStatus.emit(e);
      }
    }else{
      this.toast.create({
        message:"Passwords do not match, try again",
        duration:3000
      }).present();
    }

  }

}
