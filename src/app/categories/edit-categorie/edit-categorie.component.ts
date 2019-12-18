import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {
  addForm: FormGroup;
  id: string;
  IsFiled = false;
  token: string;

  constructor(private categorieService: CategorieService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder, ) {
                this.addForm = this.formBuilder.group({
                  id: [],
                  libelle: ['', [Validators.required, Validators.maxLength(20)]],

                });
              }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getCategorieByID(this.id);

    this.token =  window.localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
    this.router.navigate(['login']);
  }

}

  getCategorieByID(id) {
    this.categorieService.getCategorieByID(id).subscribe(
      res => {
        console.log(res);
        this.addForm.controls['libelle'].setValue(res['libelle']);
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
        libelle : this.addForm.controls.libelle.value,
      };
      this.categorieService.updateCategorie(body).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['listCategorie']);
          }
        );
    }
  }

}
