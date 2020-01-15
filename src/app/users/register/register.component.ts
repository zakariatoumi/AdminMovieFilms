import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../_helpers/must-match.validator';
import { User } from '../../Model/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  token: string;
  IsFiled = false;
  Error: any;
  status: boolean;
  message: any;
  Success: any;



  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              ) { }

  addForm: FormGroup;

  ngOnInit() {
    this.token =  window.sessionStorage.getItem('token');
    // console.log(this.token);
    if (!this.token) {
      this.router.navigate(['login']);
    }
    this.addForm = this.formBuilder.group({
      id: [],
      nom: ['', [Validators.required, Validators.maxLength(20)]],
      prenom: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required],

    },
    {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {

    this.IsFiled = true;
    if (this.addForm.valid) {
    this.userService.createUsers(this.addForm.value).subscribe((data: any) => {
      if (data.error) {
        this.status = true;
        this.message = data.error;
      } else if (data.success) {
        this.Success = data.success;
        this.router.navigate(['/accueil/view']);
    }

      }
    );
    }

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
  }
  }

  onReset() {
    this.IsFiled = false;
    this.addForm.reset();
}

}
