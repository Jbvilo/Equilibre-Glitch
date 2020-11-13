import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '.';


@Injectable()
export class account {
  studentlist: any[] = [];

  constructor(private router: Router,private http: HttpClient, private authservice:AuthService) { }

 

 sendemail(mail){
  const requestOptions: Object = {
    /* other options here */
    responseType: 'text'
  }
   this.http.post<any>("http://localhost:8080/api/sendemail", mail, requestOptions).subscribe(data => {

     console.log(data);
     alert("Vous devriez avoir reçu le mail");

   })
    alert("Vous allez recevoir un mail afin de changer votre mot de passe")
  }





  addstudent(url){




this.studentlist=url.student;

let userinfo=this.authservice.getUser()+" "+this.authservice.getInfo().lastName+" "+this.authservice.getInfo().email;



if(this.studentlist.includes(userinfo))
{
  alert("Vous etes déjà inscrit à ce cours")
}
else{
    this.studentlist.push(this.authservice.getUser()+" "+this.authservice.getInfo().lastName+" "+this.authservice.getInfo().email)
 


const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer TOKEN', 'Accept': 'application/json' }

    this.http.patch(url._links.self.href,JSON.stringify( {
      
      "student":this.studentlist,

    }), {
      'headers': headers,
      observe: 'response'
    }).subscribe((data) => {

if(data.status == 200){

  alert("Inscription réussie")
}


  })
  }
  }
}
   
  