import { DOCUMENT } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent  {
  constructor(@Inject(DOCUMENT) document,private router: Router,private authService: AuthService) { }
  
  

  
    
  Onsubmit = () => {
    this.router.navigate(['/create-account']);
  }

  forgot()
  {
    this.router.navigate(['/reset-password']);

  }

  async connex()
  {
 let mail=(<HTMLInputElement>document.getElementById("mail").firstChild.firstChild.firstChild).value
 let password=(<HTMLInputElement>document.getElementById("password").firstChild.firstChild.firstChild).value


    const res =await this.authService.logIn(mail,password);





}

}
