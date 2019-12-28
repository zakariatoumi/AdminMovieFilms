import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../Model/categorie';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from '../../categories/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  categorie: Categorie[];
  addForm: FormGroup;
  token: string;
  IsFiled = false;

  constructor(private formBuilder: FormBuilder,
              private categorieService: CategorieService,
              private router: Router, ) { }

  ngOnInit() {
     this.addForm = this.formBuilder.group({
      id: [],
      libelle: ['', [Validators.required, Validators.maxLength(20)]],
    });

     this.token =  window.localStorage.getItem('token');
     console.log(this.token);
     if (!this.token) {
      this.router.navigate(['login']);
      }
  }

  get f() {
    return this.addForm.controls;
  }



    onSubmit() {
      this.IsFiled = true;
      if (this.addForm.valid) {
    // console.log(this.addForm.value);
    this.categorieService.addCategorie(this.addForm.value)
    .subscribe(
      data => {
        this.router.navigate(['/accueil/listCategorie']);
      }
    );
    }
    }

}
