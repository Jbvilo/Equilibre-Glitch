import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
username: string;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    
    this.username = this.authService.getUser();


  //this.authService.getUser().then((e) => this.username = e.data);
}
}
