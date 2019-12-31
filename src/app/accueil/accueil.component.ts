import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  title = 'AdminMovieFilms';
  token: string;
  email: string;
  constructor(private router: Router ) { }


  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    // console.log('email');
    // console.log(this.email);
    this.token =  sessionStorage.getItem('token');
    // console.log('token');
    // console.log(this.token);
    
    if (!this.token) {
      this.router.navigate(['login']);
    }

    }

    logOut() {
      window.sessionStorage.removeItem('token');
      this.router.navigate(['login']);
    }
}
