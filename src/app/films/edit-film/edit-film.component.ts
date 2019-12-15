import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmService } from '../../films/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../Model/categorie';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {
  addForm: FormGroup;
  IsFiled = false;
  id: string;
  token: string;
  categorie: Categorie[];

  constructor(private formBuilder: FormBuilder,
              private filmService: FilmService,
              private route: ActivatedRoute,
              private router: Router) {
                this.addForm = this.formBuilder.group({
                  id: [],
                  titre_film: ['', [Validators.required, Validators.maxLength(100)]],
                  pseudo: ['', [Validators.required, Validators.maxLength(100)]],
                  lien_film: ['', [Validators.required, Validators.maxLength(1000)]],
                  description: ['', [Validators.required, Validators.maxLength(1000)]],
                  id_categorie: ['', [Validators.required, Validators.maxLength(1000)]],

                });
              }

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



    this.id = this.route.snapshot.params.id;
    this.getFilmsByID(this.id);

    this.token =  window.localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
    this.router.navigate(['login']);
  }

  }

    getFilmsByID(id) {
    this.filmService.getFilmsByID(id).subscribe(
      res => {
        console.log(res);
        this.addForm.controls['titre_film'].setValue(res['titre_film']);
        this.addForm.controls['pseudo'].setValue(res['pseudo']);
        this.addForm.controls['lien_film'].setValue(res['lien_film']);
        this.addForm.controls['description'].setValue(res['description']);
        this.addForm.controls['id_categorie'].setValue(res['id_categorie']);
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
        titre_film : this.addForm.controls.titre_film.value,
        pseudo : this.addForm.controls.pseudo.value,
        lien_film : this.addForm.controls.lien_film.value,
        description : this.addForm.controls.description.value,
        id_categorie : this.addForm.controls.id_categorie.value,
      };
      this.filmService.updateFilms(body).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['listFilms']);
          }
        );
    }
  }

}
