import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  addForm: FormGroup;
  IsFiled = false;
  id: string;
  token: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.addForm = this.formBuilder.group({
      id: [],
      nom: ['', [Validators.required, Validators.maxLength(20)]],
      prenom: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],

    });
  }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.id = this.route.snapshot.params.id;
    this.getUsersByID(this.id);

    this.token =  window.localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
    this.router.navigate(['login']);
  }
}

  getUsersByID(id) {
    this.userService.getUsersByID(id).subscribe(
      res => {
        console.log(res);
        this.addForm.controls['nom'].setValue(res['nom']);
        this.addForm.controls['prenom'].setValue(res['prenom']);
        this.addForm.controls['email'].setValue(res['email']);
        this.addForm.controls['password'].setValue(res['password']);
    });
  }
  get f() {
    return this.addForm.controls;
  }
  onSubmit() {
    this.IsFiled = true;
    if (this.addForm.valid) {
      const body = {
        id : this.id,
        nom : this.addForm.controls.nom.value,
        prenom : this.addForm.controls.prenom.value,
        email : this.addForm.controls.email.value,
        password : this.addForm.controls.password.value
      };
      this.userService.updateUsers(body).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/accueil/view']);
          }
        );
    }
  }

}
