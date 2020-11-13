import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HorseService {
horselist;
    constructor(private router: Router, private http: HttpClient) { }



    addhorse(firstName: String, birthdate: Date) {

        const headers = { 'content-type': 'application/json' }
        this.http.post("http://localhost:8080/horse", {
            "firstName": firstName,
            "birthdate": birthdate,
        }, { 'headers': headers }).subscribe(data => {
            console.log(data)

        }
        )
    }

    gethorses() {
this.http.get<any>('http://localhost:8080/horse').subscribe(data => {
            console.log(data)
        this.horselist=data._embedded.horse;

    }) }


    gethorseslit(){
        return this.horselist;
    }
 


}