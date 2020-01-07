import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../films/film.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Film } from '../../Model/film';


@Component({
  selector: 'app-details-films',
  templateUrl: './details-films.component.html',
  styleUrls: ['./details-films.component.css']
})
export class DetailsFilmsComponent implements OnInit {
  id: any;
  film: Film[];

  constructor(private filmService: FilmService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.DetailsFilmByID(this.id);
  }
  DetailsFilmByID(id: any) {
    this.filmService.DetailsFilmByID(id).subscribe(
      (data: Film[]) => {

        this.film = data;

    },
    err => {
      console.log(err);
      }
      );
  }

}
