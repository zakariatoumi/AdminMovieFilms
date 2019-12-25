import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AdminMovieFilms';
  token: string;

  constructor(private router: Router
              ) { }


  ngOnInit() {
  this.token =  window.localStorage.getItem('token');
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
