import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';
import { HorseService } from 'src/app/shared/services/horse.service';

@Component({
  selector: 'app-ecurie',
  templateUrl: './ecurie.component.html',
  styleUrls: ['./ecurie.component.scss']
})
export class EcurieComponent implements OnInit {
Nom="Jolly jumper"
Numero="001"
Date="07/10/2010"
  popupVisible: boolean;
  horses;
  searchlist: any[] = [];
  horseslist;
  constructor( private authservice : AuthService , private horseservice: HorseService,private http: HttpClient,private router: Router) { }

  ngOnInit() {


this.http.get<any>('http://localhost:8080/horse').subscribe(data => {
            console.log(data)
        this.horses=data._embedded.horse;
this.horseslist=data._embedded.horse;
    })
   }

   search(input) {

    let textvalue = input.element.firstChild.firstChild.firstChild.value.toLowerCase();

    this.searchlist = [];
    for (var i = 0; i < this.horses.length; i++) {
      if (this.horses[i].firstName.toLowerCase().includes(textvalue.toLowerCase())) {

        this.searchlist.push(this.horses[i]);
      }
    }
    this.horseslist = Object.values(this.searchlist);
   }
  
 btn_visible(){

  if (this.authservice.getrole() == "Cavalier" ){
return false;
  }
  else {

    return true;
  }

 }

  myFunction(){
    this.popupVisible = true;
  }

  addhorse(){
    let horsename=(<HTMLInputElement>document.getElementById("horsename").firstChild.firstChild.firstChild).value
let birth=(<HTMLInputElement>document.getElementById("birth").firstChild.firstChild.firstChild).value

let newbirth=new Date(birth);




if( horsename != "" && birth != ""){


  this.http.get<any>('http://localhost:8080/horse/search/findByfirstName?firstName=' + horsename).subscribe(data => {

  
    if (data._embedded.horse[0] != undefined) {
      alert("Il existe déjà un cheval à ce nom");
    }
    else {


const headers = { 'content-type': 'application/json' }
this.http.post("http://localhost:8080/horse", {
    "firstName": horsename,
    "birthdate": newbirth,
}, { 'headers': headers }).subscribe(data => {
   

  this.http.get<any>('http://localhost:8080/horse').subscribe(data => {

this.horses=data._embedded.horse;
this.horseslist=data._embedded.horse;
this.router.navigate(['/pages/ecurie'])
this.popupVisible = false;
})
}
)


}
  
  })
}

else {
  alert("Veuillez remplir tous les champs ! ")
}
  }
}
