import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AdminMovieFilms';
  token: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router
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
