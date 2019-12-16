import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../films/film.service';
import { Film } from '../../Model/film';
import { Categorie } from '../../Model/categorie';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  categorie: Categorie[];
  addForm: FormGroup;
  token: string;
  IsFiled = false;

  constructor(private formBuilder: FormBuilder,
              private filmService: FilmService,
              private router: Router, ) { }

  ngOnInit() {
    this.filmService.getCategorie()
    .subscribe( (data: Categorie[]) => {

        this.categorie = data;
        console.log(this.categorie);

    },
    err => {
      console.log(err);
      }
    );

    this.addForm = this.formBuilder.group({
      id: [],
      titreFilm: ['', [Validators.required, Validators.maxLength(100)]],
      pseudoFilm: ['', [Validators.required, Validators.maxLength(100)]],
      lienFilm: ['', [Validators.required, Validators.maxLength(500)]],
      descriptionFilm: ['', [Validators.required, Validators.maxLength(500)]],
      categorie: ['', [Validators.required]],

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
    this.filmService.addFilms(this.addForm.value)
    .subscribe(
      data => {
        this.router.navigate(['listFilms']);
      }
    );
    }


  }

}
