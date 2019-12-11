import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  token: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,

              ) { }

  addForm: FormGroup;

  ngOnInit() {
    this.token =  window.localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
      this.router.navigate(['login']);
    }
    this.addForm = this.formBuilder.group({
      id: [],
      nom: ['', [Validators.required, Validators.maxLength(20)]],
      prenom: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],

    });
  }

  onSubmit() {

    this.userService.createUsers(this.addForm.value)
    .subscribe(
      data => {
        this.router.navigate(['view']);
      }
    );


  }

}
