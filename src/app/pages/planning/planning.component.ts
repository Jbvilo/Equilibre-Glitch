import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { AuthService } from 'src/app/shared/services';
import { account } from 'src/app/shared/services/account.service';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
 lessons;
 popupVisible: boolean;
 popupVisible2: boolean;
 role= true;
 searchlist;
 lessonslist;
 buttoncava:boolean;
buttonmonit:boolean;
buttonadmin:boolean;
studentlist2;
constructor(private http: HttpClient,  private account : account,private authservice : AuthService,private router: Router){}

  ngOnInit() {

    this.getplan();
   
this.getrole();
  }



show(lesson){

  this.popupVisible2=true;
console.log(lesson.student)
this.studentlist2=lesson.student;

}


  inscript(lesson){
  
    this.account.addstudent(lesson);

  }

  deletelesson(){

    
  }


  search(input) {

    let textvalue = input.element.firstChild.firstChild.firstChild.value.toLowerCase();

    this.searchlist = [];
    for (var i = 0; i < this.lessons.length; i++) {
      if (this.lessons[i].moniteur.toLowerCase().includes(textvalue.toLowerCase())) {

        this.searchlist.push(this.lessons[i]);
      }
    }
    this.lessonslist = Object.values(this.searchlist);
   }


getrole(){

  let getrole= this.authservice.getrole();
  if(getrole=="Administrateur"){
this.role= false;

    this.buttoncava=false;
    this.buttonmonit=false;
    this.buttonadmin=true;
  }
  else if (getrole=="Moniteur"){

    this.buttoncava=false;
    this.buttonmonit=true;
    this.buttonadmin=false;
  }
  else if (getrole=="Cavalier"){

    this.buttoncava=true;
    this.buttonmonit=false;
    this.buttonadmin=false;
  }



}

 getplan(){

  this.http.get<any>('http://localhost:8080/lesson/').subscribe(data => {
     
console.log(data._embedded.lesson);
this.lessons=data._embedded.lesson;
this.lessonslist=Object.values(data._embedded.lesson);
       })
  
  }

  
  btn_visible(){

    if (this.authservice.getrole() == "Cavalier" || this.authservice.getrole() == "Administrateur" ){
  return false;
    }
    else {
  
      return true;
    }
  
   }
  


    myFunction(){
      this.popupVisible = true;
    }


    submit(){
      let titre=(<HTMLInputElement>document.getElementById("titre").firstChild.firstChild.firstChild).value
      let level=(<HTMLInputElement>document.getElementById("level").firstChild.firstChild.firstChild).value
      let date=(<HTMLInputElement>document.getElementById("date").firstChild.firstChild.firstChild).value
      let start=(<HTMLInputElement>document.getElementById("start").firstChild.firstChild.firstChild).value
      let duree=(<HTMLInputElement>document.getElementById("duree").firstChild.firstChild.firstChild).value
      let elevemax=(<HTMLInputElement>document.getElementById("elevemax").firstChild.firstChild.firstChild).value
      if(level != "" && date != "" && start !="" && duree != "" && elevemax != ""){


        if(parseInt(start)+parseInt(duree) >= 24) {

          alert("Duree trop longue !")
        } 
        else {
let newdate=  new Date(date);


let moniteurname = this.authservice.getUser();
let moniteurlastname = this.authservice.getInfo().lastName;
let same = true;

for (var i = 0; i < this.lessons.length; i++) {
  if (this.lessons[i].moniteur.toLowerCase() == moniteurname.toLowerCase() +" "+moniteurlastname.toLowerCase()  ){

    if ( (this.lessons[i].date as String) == date ){



      if ( parseInt(start) >= parseInt(this.lessons[i].startTime ) &&  parseInt(start) < parseInt(this.lessons[i].endTime || parseInt(start)+parseInt(duree) >= parseInt(this.lessons[i].startTime ) &&  parseInt(start)+parseInt(duree) < parseInt(this.lessons[i].endTime ))){



alert('Vous avez déjà un cours sur ces horaires !')
same = false;
return;


  } 


}
  }
}






















if(same == true){
const headers = { 'content-type': 'application/json' }

this.http.post("http://localhost:8080/lesson", {
    "titre": titre.toUpperCase(),
    "level": level,
    "moniteur" : moniteurname +" "+ moniteurlastname,
    "date": newdate,
    "startTime":start,
    "endTime": parseInt(start)+parseInt(duree),
    "nbreleve":elevemax
  
  }, { 'headers': headers }).subscribe(data => {
 
  console.log(data);


  this.getplan();
this.popupVisible=false;

  })

}


        }
    }
    else{

      alert("Tous les champs sont obligatoires sauf celui du Titre");
    }

   
}

}