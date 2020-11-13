import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent implements OnInit{
  loadingVisible = false;

  constructor(private authService: AuthService, private router: Router) {}


  async ngOnInit(){

let userinfo= await this.authService.getInfo();

(<HTMLInputElement>document.getElementById("nom").firstChild.firstChild.firstChild).value = userinfo.lastName;
(<HTMLInputElement>document.getElementById("prenom").firstChild.firstChild.firstChild).value = userinfo.firstName;
(<HTMLInputElement>document.getElementById("mail").firstChild.firstChild.firstChild).value=userinfo.email;  
(<HTMLInputElement>document.getElementById("licence").firstChild.firstChild.firstChild).value=userinfo.licencenumber;
(<HTMLInputElement>document.getElementById("phone").firstChild.firstChild.firstChild).value=userinfo.phonenumber;
(<HTMLInputElement>document.getElementById("pass").firstChild.firstChild.firstChild).value=userinfo.password;
(<HTMLInputElement>document.getElementById("statuss").firstChild.firstChild.firstChild).value=userinfo.role;




  }
  onShown() {
    setTimeout(() => {
        this.loadingVisible = false;
    }, 1000);
}

showLoadPanel() {
  this.loadingVisible = true;
}


onHidden() {

  this.authService.deletemyaccount();
  this.authService.logOut();

}

update(){

let  nom= (<HTMLInputElement>document.getElementById("nom").firstChild.firstChild.firstChild).value ;
let prenom=(<HTMLInputElement>document.getElementById("prenom").firstChild.firstChild.firstChild).value ;
 let mail = (<HTMLInputElement>document.getElementById("mail").firstChild.firstChild.firstChild).value;  
 let licence =  (<HTMLInputElement>document.getElementById("licence").firstChild.firstChild.firstChild).value;
 let phone = (<HTMLInputElement>document.getElementById("phone").firstChild.firstChild.firstChild).value;
 let pass = (<HTMLInputElement>document.getElementById("pass").firstChild.firstChild.firstChild).value;
 let status = (<HTMLInputElement>document.getElementById("statuss").firstChild.firstChild.firstChild).value;

  this.authService.update(nom,prenom,mail,licence,phone,pass,status)
}

}
