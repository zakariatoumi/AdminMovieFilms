import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;


  constructor(
              private router: Router
) { }

  ngOnInit() {
    this.token =  window.localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
    this.router.navigate(['login']);
  }

}


}
