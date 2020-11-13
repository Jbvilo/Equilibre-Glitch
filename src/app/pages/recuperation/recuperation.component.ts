import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { account } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-recuperation',
  templateUrl: './recuperation.component.html',
  styleUrls: ['./recuperation.component.scss']
})
export class RecuperationComponent implements OnInit {

  constructor(private router: Router, private account : account, private http: HttpClient) { }

  ngOnInit(): void {
  }

  send(){
    let mail=(<HTMLInputElement>document.getElementById("mail").firstChild.firstChild.firstChild).value


    let entry= Number(mail);
    console.log(entry);
   
  


    if(mail != ""){

      if(isNaN(entry)){

      if(mail.includes("@")){

        this.http.get<any>('http://localhost:8080/people/search/findByEmail?email=' + mail).subscribe(data => {

        console.log(data._embedded.people[0])

         if (data._embedded.people[0] == undefined) {
               alert("Cette adresse email n'est associée à auncun compte Equilibre")
    
          }
          else{

           this.account.sendemail(mail);
          }

      })


      }
      else{
        alert("Entrez une adresse email valide")
      }
    }

    else {

    



        this.http.get<any>('http://localhost:8080/people/search/findByphonenumber?phonenumber=' + mail).subscribe(data => {


          if (data._embedded.people[0] == undefined) {
            alert("Ce numéro de téléphone n'est associé à auncun compte Equilibre")
 
       }
       else{

        this.account.sendemail(data._embedded.people[0].email);
       }
        })

    
  
    
    }







  }
    else {
      alert("Entrez l'adresse email dont vous voulez récupérer le compte")
    }
    //this.router.navigate(['/login']);


}
}
