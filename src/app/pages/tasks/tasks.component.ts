import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import 'devextreme/data/odata/store';
import dxList from 'devextreme/ui/list';
import { AuthService } from 'src/app/shared/services';
import { account } from 'src/app/shared/services/account.service';


@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {

  popupVisible = false;
  people;
  titlesList;
  searchlist: any[] = [];
  searchlist2: any[] = [];
  selectedItems: any[] = [];
  allowDeleting: boolean = false;
  deleteType: string = "toggle";
  buttonrole="Administrateur";
  vue = "administrateur";
  popuptitre = "Ajout d'un " + this.vue;

  constructor(private account: account, private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.http.get<any>('http://localhost:8080/people/').subscribe(data => {
      this.people = data._embedded.people;
      this.filter("Administrateur");
    })


  }

  buttonstate(element) {
  
    document.getElementById("but1").style.backgroundColor = "White";
    document.getElementById("but1").style.color = "Black";


    document.getElementById("but2").style.backgroundColor = "White";
    document.getElementById("but2").style.color = "Black";
    document.getElementById("but3").style.backgroundColor = "White";
    document.getElementById("but3").style.color = "Black";



    element.element.style.backgroundColor = "#03A9F4";
    element.element.style.color = "White";
    this.buttonfiltre(element);

   

  }
  
  buttonfiltre(element){
  

      if (element.element.id == "but1") {
        this.filter("Administrateur");
        this.vue = "administrateur";
        this.buttonrole = "Administrateur";
        this.popuptitre = "Ajout d'un " + this.vue;
      }
      if (element.element.id == "but2") {
        this.filter("Moniteur");
        this.vue = "moniteur";
        this.popuptitre = "Ajout d'un " + this.vue;
        this.buttonrole = "Moniteur";
      }
      if (element.element.id == "but3") {
        this.filter("Cavalier");
        this.vue = "cavalier";
        this.popuptitre = "Ajout d'un " + this.vue;
        this.buttonrole = "Cavalier";
      }

  }


  filter(role) {
     let searchvalue=(<HTMLInputElement>document.getElementById("ooo").firstChild.firstChild.firstChild).value;
  


    this.searchlist = [];
    for (var i = 0; i < this.people.length; i++) {
      if (this.people[i].role == role) {

        this.searchlist.push(this.people[i]);
      }
    }


    this.searchlist2 = [];
    for (var i = 0; i < this.searchlist.length; i++) {
      if (this.searchlist[i].firstName.toLowerCase().includes( searchvalue.toLowerCase())) {

        this.searchlist2.push(this.searchlist[i]);
      }
    }

    this.titlesList = Object.values(this.searchlist2);
  }

  Onsubmit() {
    let name = (<HTMLInputElement>document.getElementById("name").firstChild.firstChild.firstChild).value.toUpperCase()
    let surname = (<HTMLInputElement>document.getElementById("surname").firstChild.firstChild.firstChild).value.charAt(0).toUpperCase() + (<HTMLInputElement>document.getElementById("surname").firstChild.firstChild.firstChild).value.slice(1).toLowerCase()
    let mail = (<HTMLInputElement>document.getElementById("mail").firstChild.firstChild.firstChild).value
    let licence = (<HTMLInputElement>document.getElementById("licence").firstChild.firstChild.firstChild).value
    let phone = (<HTMLInputElement>document.getElementById("phone").firstChild.firstChild.firstChild).value
    let pass = (<HTMLInputElement>document.getElementById("pass").firstChild.firstChild.firstChild).value

    if(name != "" && surname != "" && mail != "" && phone !="" && pass != ""){

      
      if(mail.includes("@")){
      
      
    this.http.get<any>('http://localhost:8080/people/search/findByphonenumber?phonenumber=' + phone).subscribe(data => {

      if(data._embedded.people[0] == undefined ){

        
        this.http.get<any>('http://localhost:8080/people/search/findByEmail?email=' + mail).subscribe(data => {

          if (data._embedded.people[0] != undefined) {
            alert("Cet email est déjà associé à un compte");
          }
          else {



    const headers = { 'content-type': 'application/json' }
    let role = this.vue.charAt(0).toUpperCase() + this.vue.slice(1);
    console.log(role);

    this.http.post("http://localhost:8080/api/sign-up", {
      "firstName": surname,
      "lastName": name,
      "email": mail,
      "password": pass,
      "role": role,
      "phonenumber": phone,
      "licencenumber": licence

    }, { 'headers': headers }).subscribe(data => {

      this.popupVisible = false;

      this.http.get<any>('http://localhost:8080/people/').subscribe(data => {
        this.people = data._embedded.people
        this.titlesList = Object.values(data._embedded.people);
        this.filter(role)
        // this.ngOnInthit()
      })
    })






  }
        })
      }
      else {

        alert("Ce numéro de téléphone est déjà associé à un compte !")
      }

      })

      }
        
    else{
      alert("Entrez une adresse e-mail valide")
    }
    }
    else {
    
      alert("Tous les champs sont obligatoires sauf le numero de licence !")
    }
    





  }


  search(input) {
 


    let textvalue = input.element.firstChild.firstChild.firstChild.value.toLowerCase();

    
    this.searchlist = [];
    for (var i = 0; i < this.people.length; i++) {
      if (this.people[i].role == this.buttonrole) {

        this.searchlist.push(this.people[i]);
      }
    }


    this.searchlist2 = [];
    for (var i = 0; i < this.searchlist.length; i++) {
      if (this.searchlist[i].firstName.toLowerCase().includes( textvalue)) {

        this.searchlist2.push(this.searchlist[i]);
      }
    }

    this.titlesList = Object.values(this.searchlist2);

/*
    if (textvalue == "") {
      this.filter(this.vue);
    }
    else {

      if (textvalue.includes(" ")) {

        let val = textvalue.split(" ", 2);

        let textvalue1 = val[0];
        let textvalue2 = val[1];

        console.log(textvalue1 + textvalue2)
        for (var i = 0; i < this.people.length; i++) {


          if (this.people[i].firstName.toLowerCase().includes(textvalue1) && this.people[i].lastName.toLowerCase().includes(textvalue2)) {
            this.searchlist.push(this.people[i])
          }
        }

      }
      else {
        for (var i = 0; i < this.titlesList.length; i++) {


          if (this.titlesList[i].firstName.toLowerCase().includes(textvalue) || this.titlesList[i].lastName.toLowerCase().includes(textvalue) || this.titlesList[i].email.toLowerCase().includes(textvalue)) {
            this.searchlist.push(this.titlesList[i])
          }
        }

      }
      this.titlesList = Object.values(this.searchlist);
    }
*/
  }


  myFunction() {
    this.popupVisible = true;
  }

}

