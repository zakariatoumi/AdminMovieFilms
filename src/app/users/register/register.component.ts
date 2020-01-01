import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ValiderEmail } from 'src/app/Model/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  token: string;
  IsFiled = false;
  Error: any;



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
    this.userService.createUsers(this.addForm.value)
    .subscribe(
      data => {
        this.router.navigate(['/accueil/view']);
      }
    );
    }

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
  }

     // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addForm.value, null, 4));
    this.userService.valideEmail()
    .subscribe((data: ValiderEmail[]) => {

      this.Error = data;

      console.log('ERROR');
      console.log(this.Error);

    },
      err => {
        console.log(err);
      }
    );

  }

  onReset() {
    this.IsFiled = false;
    this.addForm.reset();
}

}
