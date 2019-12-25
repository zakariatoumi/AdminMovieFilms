import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../films/film.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Film } from '../../Model/film';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-details-films',
  templateUrl: './details-films.component.html',
  styleUrls: ['./details-films.component.css']
})
export class DetailsFilmsComponent implements OnInit {
  id: any;
  film: Film[];
  safeSrc: SafeResourceUrl;

  constructor(private filmService: FilmService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              ) {this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/fAU5at2aRj4'); }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.DetailsFilmByID(this.id);
  }
  DetailsFilmByID(id: any) {
    this.filmService.DetailsFilmByID(id).subscribe(
      (data: Film[]) => {

        this.film = data;
        console.log(this.film);

    },
    err => {
      console.log(err);
      }
      );
  }

}
