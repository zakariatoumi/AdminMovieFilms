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
  constructor(private router:Router) { }


  ngOnInit() {
    this.token =  localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
      this.router.navigate(['login']);
    }

    }

    logOut() {
      window.localStorage.removeItem('token');
      this.router.navigate(['login']);
    }
}
