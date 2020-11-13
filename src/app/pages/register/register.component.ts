import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
buttonstate=document.getElementById("buttonsub");
constructor(private router: Router,private authService: AuthService) { }

getformstate(){
let name=(<HTMLInputElement>document.getElementById("name").firstChild.firstChild.firstChild).value
let surname=(<HTMLInputElement>document.getElementById("surname").firstChild.firstChild.firstChild).value
let mail=(<HTMLInputElement>document.getElementById("mail").firstChild.firstChild.firstChild).value
let phone=(<HTMLInputElement>document.getElementById("phone").firstChild.firstChild.firstChild).value
let pass=(<HTMLInputElement>document.getElementById("pass").firstChild.firstChild.firstChild).value




if(name != "" && surname != "" && mail != "" && phone !="" && pass != ""){

  document.getElementById("buttonsub").style.backgroundColor = "#75A938";
  document.getElementById("buttonsub").style.color = "white";
}
else {
  document.getElementById("buttonsub").style.backgroundColor = "#EEEDED";
  document.getElementById("buttonsub").style.color = "#d4d1d1";

}

}


Flytologgin(){

  this.router.navigate(['/login']);
}

Onsubmit()
{


let name=(<HTMLInputElement>document.getElementById("name").firstChild.firstChild.firstChild).value
let surname=(<HTMLInputElement>document.getElementById("surname").firstChild.firstChild.firstChild).value
let mail=(<HTMLInputElement>document.getElementById("mail").firstChild.firstChild.firstChild).value
let licence=(<HTMLInputElement>document.getElementById("licence").firstChild.firstChild.firstChild).value
let phone=(<HTMLInputElement>document.getElementById("phone").firstChild.firstChild.firstChild).value
let pass=(<HTMLInputElement>document.getElementById("pass").firstChild.firstChild.firstChild).value


if(name != "" && surname != "" && mail != "" && phone !="" && pass != ""){

if(mail.includes("@")){



this.authService.createAccount(name,surname, mail, licence, phone,pass);
}

else{
  alert("Entrez une adresse e-mail valide")
}
}
else {

  alert("Tous les champs sont obligatoires sauf le numero de licence !")
}



}


}
