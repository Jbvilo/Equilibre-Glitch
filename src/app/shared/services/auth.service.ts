import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ok } from 'assert';


import { BehaviorSubject, Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

const defaultPath = '/';

interface SearchResults {
  total: number;
  results: Array<object>;
}

@Injectable()
export class AuthService {
  private _user = null;
  private _role = null;
  private _info = null;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;



  navchange = new EventEmitter();

  get loggedIn(): boolean {
    if (this.currentUserSubject.value != null) {
      this._user = this.currentUserSubject.value.firstName;
      this._info = this.currentUserSubject.value;
      this._role = this.currentUserSubject.value.role;
      return !!this._user;
    }
    else {
      return !!this._user;
    }
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }


  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    //AJOUTER TOKEN A LOCAL STORAGE
  }

  deletemyaccount(){
    this.http.delete<any>(this._info._links.self.href).subscribe(data => {


      console.log(data);
      alert("Votre compte a été supprimé")
    })

  }




  public getcurrentUserValue() {
    return this.currentUserSubject.value


  }

  async isEmailExist(mail) {


    let res = this.http.get<any>('http://localhost:8080/people/search/findByEmail?email=' + mail).subscribe(data => {

      if (data._embedded.people[0] != "undefined") {
        return {
          isOk: true,
          data: data._embedded.people[0],
          message: "Email exist"
        }
      }
      else {

        return {
          isOk: true,
          message: "Email doesn't exist"
        }

      }


    });

    return {
      isOk: true,
      res
    }

  }



  logIn(email: string, password: string) {



    

  let entry= Number(email);
  console.log(entry);
 

if(isNaN(entry)){
  try {
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer TOKEN', 'Accept': 'application/json' }

    this.http.post('http://localhost:8080/api/login', JSON.stringify({

      "email": email,
      "password": password


    }), {
      'headers': headers,
      observe: 'response'
    }).subscribe((data) => {

   

      if (data.ok == true) {
        this.http.get<any>('http://localhost:8080/people/search/findByEmail?email=' + email).subscribe(data => {


          this._user = data._embedded.people[0].firstName;

          this._role = data._embedded.people[0].role;

          this._info = data._embedded.people[0];

          localStorage.setItem('currentUser', JSON.stringify(data._embedded.people[0]));
          this.currentUserSubject.next(data._embedded.people[0]);

          console.log(this.currentUserSubject.value)

          this.navchange.emit(data._embedded.people[0]);


          if (data._embedded.people[0].role == "Administrateur") {
            this.router.navigate(['/tasks']);
          }
          else {

            this.router.navigate(['/home']);
          }


        })


      }
 




    })




 }
  catch {
 
    return {
      isOk: false,
      message: "erreur"
    };
  }

}



else {


    try {
      const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer TOKEN', 'Accept': 'application/json' }

      
          this.http.get<any>('http://localhost:8080/people/search/findByphonenumber?phonenumber=' + email).subscribe(data => {
            console.log(data)


            this._user =  data._embedded.people[0].firstName;

            this._role =  data._embedded.people[0].role;

            this._info = data._embedded.people[0];

            localStorage.setItem('currentUser', JSON.stringify(data._embedded.people[0]));
            this.currentUserSubject.next(data._embedded.people[0]);

            console.log(this.currentUserSubject.value)

            this.navchange.emit(data._embedded.people[0]);


            if (data._embedded.people[0].role == "Administrateur") {
              this.router.navigate(['/tasks']);
            }
            else {

              this.router.navigate(['/home']);
            }


          })


        }


    catch {
      return {
        isOk: false,
        message: "erreur"
      };
    }
  }
  }


  getInfo() {

    return this._info;
  }

  getrole() {
    return this._role;
  }

  getUser() {
    return this._user;
  }

  createAccount(name: string, surname: string, mail: string, licence: string, phone: string, pass: string) {

    this.http.get<any>('http://localhost:8080/people/search/findByphonenumber?phonenumber=' + phone).subscribe(data => {

 if(data._embedded.people[0] == undefined ){


    this.http.get<any>('http://localhost:8080/people/search/findByEmail?email=' + mail).subscribe(data => {

      if (data._embedded.people[0] != undefined) {
        alert("Cet email est déjà associé à un compte");
      }
      else {
        const headers = { 'content-type': 'application/json' }
        this.http.post("http://localhost:8080/api/sign-up", {
          "firstName": surname,
          "lastName": name,
          "email": mail,
          "password": pass,
          "role": "Cavalier",
          "phonenumber": phone,
          "licencenumber": licence
        }, { 'headers': headers }).subscribe(data => {
          console.log(data)
          alert("Félicitation " + (data as any).firstName + " ! Vous avez créé votre compte")
          this.router.navigate(['/login'])
        }
        )
      }
    })
  }
  else {

alert("Ce numéro de téléphone est déjà associé à un compte !")
  }
  })

}

  





  async changePassword(email: string, password: string) {

    const salt = bcrypt.genSaltSync(10);
   let pass = bcrypt.hashSync(password, salt);



    try {
     
      this.http.get<any>('http://localhost:8080/people/search/findByEmail?email=' + email).subscribe(data => {

       
        
if(data._embedded.people[0] != undefined){

        const headers = { 'content-type': 'application/json' }


        this.http.put(data._embedded.people[0]._links.self.href,  JSON.stringify({
          
          "firstName": data._embedded.people[0].firstName,
          "lastName": data._embedded.people[0].lastName,
          "email": data._embedded.people[0].email,
          "password": pass,
          "role": data._embedded.people[0].role,
          "phonenumber": data._embedded.people[0].phonenumber,
          "licencenumber": data._embedded.people[0].licencenumber
        
  
        }), { 'headers': headers }).subscribe(data => {
          console.log(data )
         alert('Votre mot de passe a été mis à jour')
         this.router.navigate(['/login'])
        })
  
      }

      else {

        alert("Votre email n'est associé à aucun compte Equilibre")
      }

    })
  




      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  getNavChangeEmitter() {
    return this.navchange;
  }

  async update(name?: string, surname?: string, mail?: string, licence?: string, phone?: string, pass?: string, role?: string) {

    const salt = bcrypt.genSaltSync(10);
    let pass2 = bcrypt.hashSync(pass, salt);
    try {

      let selfurl = this._info._links.self.href;
      console.log(selfurl)
      const headers = { 'content-type': 'application/json' }


      this.http.put(selfurl, JSON.stringify( {
        "firstName": surname,
        "lastName": name,
        "email": mail,
        "password": pass2,
        "role": role,
        "phonenumber": phone,
        "licencenumber": licence

      }), { 'headers': headers }).subscribe(data => {
        console.log((data as any).firstName)
        this._user = (data as any).firstName;
        this._role = (data as any).role;
        this._info = (data as any);

        localStorage.setItem('currentUser', JSON.stringify((data as any)));
        this.currentUserSubject.next((data as any));

        this.navchange.emit(this._info);
        alert("Vos informations ont été mises à jour")
      })

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }


  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this._user = null;
    this.router.navigate(['/login']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig.path);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig.path;
    }

    return isLoggedIn || isAuthForm;
  }
}
