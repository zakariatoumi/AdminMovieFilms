import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: any;



  constructor(private formBuilder: FormBuilder,
              private apiService: UserService,
              private router: Router, ) { }
  loginForm: FormGroup;
  invalidLogin = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    this.apiService.login(loginData).subscribe((data: any) => {

      this.message = data.message;
      // console.log(data.token);
      if (data.token) {

          window.localStorage.setItem('token', data.token);
          this.router.navigate(['/']);
       } else {
         this.invalidLogin = true;
        //  alert('a' + data.message);
       }
     });

  }

}
